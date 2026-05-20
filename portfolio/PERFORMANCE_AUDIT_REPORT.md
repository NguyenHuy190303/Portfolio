# 🚀 Báo Cáo Audit Hiệu Năng

**Repository:** portfolio  
**Branch:** main  
**Ngày audit:** 2026-05-20  
**Tech Stack:** Next.js 15.3.9 App Router, React 19, TypeScript, Tailwind CSS 4, next-intl, Notion CMS, MDX, KaTeX, Shiki, Mermaid  
**Auditor:** AI Performance Engineer  

---

## Tóm Tắt Điều Hành

Ứng dụng dùng stack hiện đại và build production thành công, nhưng các trang theo locale hiện đang được render động và trả HTML `private, no-store`, làm mất phần lớn lợi ích CDN/page cache cho một portfolio/blog công khai. Các chi phí lớn nhất có thể xử lý ngay là CSS/font KaTeX bị tải trùng, preload quá nhiều font, và các tính năng client-only nặng được gửi hoặc kích hoạt trước khi người dùng thật sự cần. Các số liệu dưới đây được đo từ `npm run build` và `next start` trên branch `main`; chưa có Lighthouse trace hoặc dữ liệu field, nên tác động Core Web Vitals là ước lượng dựa trên code, bundle output và response headers.

**Điểm tổng thể:** Needs Work

| Hạng mục | Trạng thái | Số vấn đề |
|---|---|---|
| Bundle & Assets | 🔴 | 7 vấn đề |
| Rendering Strategy | 🔴 | 6 vấn đề |
| Network & Caching | 🔴 | 5 vấn đề |
| JS Runtime | 🟡 | 5 vấn đề |
| Third-party Scripts | 🟡 | 3 vấn đề |
| Build Config | 🟡 | 4 vấn đề |

---

## Baseline Đo Được

- `npm run build` chạy thành công.
- Next build output báo shared First Load JS: **103 kB**.
- Các route nặng nhất ở lần tải đầu:
  - `/[locale]/about`: **144 kB First Load JS**
  - `/[locale]/blog`: **137 kB First Load JS**
  - `/[locale]/blog/[slug]`: **133 kB First Load JS**
- Runtime headers từ `next start`:
  - `/en/blog`: `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`
  - `/search-index.json`: `Cache-Control: public, max-age=0`
  - `/images/avatar.jpg`: `Cache-Control: public, max-age=0`
  - `/_next/static/...js`: `Cache-Control: public, max-age=31536000, immutable`
- HTML mẫu của `/en/blog/test-post`: **169 KB raw / 21 KB gzip / 14.6 KB brotli**, chủ yếu do markup server-rendered từ KaTeX và Shiki.

---

## Vấn Đề Nghiêm Trọng (High Priority 🔴)

### [ISSUE-001] Các trang public theo locale đang dynamic và không cache được
- **Hạng mục:** Rendering Strategy / Network & Caching
- **Vị trí:** `src/app/[locale]/layout.tsx` (dòng 12-35), `src/middleware.ts` (dòng 1-7)
- **Tác động:** Các trang public không tận dụng được static/CDN caching và trả `private, no-store`; điều này có thể cộng thêm TTFB server render cho mọi document request. Với Vercel/CDN, đây thường là khác biệt giữa HTML edge-cached và server-rendered.
- **Nguyên nhân gốc:** Segment `[locale]` không export `generateStaticParams`, và layout resolve messages bằng `getMessages()` ở request time. Build production đánh dấu nhiều route locale là `ƒ` dynamic, gồm `/[locale]/blog`, `/[locale]/about`, `/[locale]/projects`, `/[locale]/certificates`.
- **Khuyến nghị:** Opt-in static generation cho segment locale nếu nội dung là public. Với `next-intl`, thêm locale params ở layout và thiết lập request locale trước khi load messages.

```tsx
// src/app/[locale]/layout.tsx
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  // ...
}
```

- **Effort:** Medium
- **Expected Gain:** Giảm TTFB và giúp HTML public cache được ở CDN; đây có khả năng là cải thiện user-visible lớn nhất.

### [ISSUE-002] KaTeX CSS bị tải hai lần và toàn bộ font KaTeX bị bundle
- **Hạng mục:** Bundle & Assets / Third-party Scripts
- **Vị trí:** `src/app/[locale]/blog/[slug]/page.tsx` (dòng 12-14, 60, 106-109)
- **Tác động:** Route blog post vừa ship KaTeX CSS/font local, vừa inject stylesheet từ jsDelivr. Build chứa **60 file font KaTeX, tổng ~1.08 MB raw** trong `.next/static/media`, và CSS chunk blog có đầy đủ `@font-face` KaTeX. Stylesheet remote có thể khiến browser khám phá font trùng và thêm một request CSS bên thứ ba.
- **Nguyên nhân gốc:** `import 'katex/dist/katex.min.css'` ở dòng 14 đã đưa KaTeX CSS vào pipeline của Next, nhưng dòng 60 lại emit thêm `<link rel="stylesheet" href="https://cdn.jsdelivr.net/.../katex.min.css" />`.
- **Khuyến nghị:** Xóa `<link>` jsDelivr. Giữ một nguồn CSS local duy nhất, hoặc tốt hơn là chỉ load KaTeX CSS cho bài có công thức.

```tsx
// Xóa dòng này khỏi BlogPostPage output:
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" />
```

- **Effort:** Low
- **Expected Gain:** Bỏ một stylesheet request bên ngoài và tránh đường tải font KaTeX bị trùng; cải thiện độ ổn định render cho bài nhiều công thức.

### [ISSUE-003] Bảy file webfont được preload trên mọi trang locale
- **Hạng mục:** Bundle & Assets / LCP
- **Vị trí:** `src/app/fonts.ts` (dòng 1-20), `src/app/[locale]/layout.tsx` (dòng 7, 31)
- **Tác động:** `/en/blog` preload bảy file WOFF2 trước khi content render. Các request này cạnh tranh bandwidth với CSS, JS và ảnh trong cửa sổ LCP. `Source_Serif_4` đang cấu hình normal+italic với weight `300`, `400`, `600`, `700`, cộng thêm Inter và JetBrains Mono, tạo ra critical font set khá rộng.
- **Nguyên nhân gốc:** Cả ba font variable được gắn ở root `<html>`, và `next/font` preload subset critical theo mặc định.
- **Khuyến nghị:** Chỉ preload font chính phục vụ text above-the-fold. Đặt `preload: false` cho font không critical, giảm weight/style của Source Serif, và dùng system monospace nếu code block không nằm above-the-fold.

```ts
export const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['400', '700'],
  preload: false
});
```

- **Effort:** Low-Medium
- **Expected Gain:** Ít request font ưu tiên cao hơn; có khả năng cải thiện LCP trên mobile mạng chậm.

### [ISSUE-004] Mermaid có thể tải client bundle rất lớn ngay khi component mount
- **Hạng mục:** Bundle & Assets / JS Runtime
- **Vị trí:** `src/components/mdx/MermaidDiagram.tsx` (dòng 8-10, 19-50)
- **Tác động:** Entry Mermaid dynamic tải các chunk khoảng **650 KB raw / ~131 KB gzip** trước khi tải thêm chunk theo từng loại diagram. Nếu bài viết có block Mermaid, render bắt đầu ngay khi hydrate, không đợi diagram gần viewport.
- **Nguyên nhân gốc:** `useEffect` gọi `import('mermaid')` và `mermaid.render()` ngay khi component hydrate. Không có viewport gate, không schedule bằng idle, và `initialize` bị gọi hai lần ở dòng 26-35.
- **Khuyến nghị:** Render SVG Mermaid ở build/server time nếu có thể. Nếu vẫn render client-side, gate import bằng `IntersectionObserver` và chỉ initialize một lần.

```tsx
// Pseudocode
const isNearViewport = useInView(ref, {rootMargin: '300px'});
useEffect(() => {
  if (!isNearViewport) return;
  requestIdleCallback(() => renderMermaid());
}, [isNearViewport, code, resolvedTheme]);
```

- **Effort:** Medium
- **Expected Gain:** Tránh parse/eval JS lớn trong initial article load; giảm rủi ro INP ở các bài có diagram.

---

## Vấn Đề Mức Trung Bình 🟡

### [ISSUE-005] Public assets chưa được tối ưu cache
- **Hạng mục:** Network & Caching
- **Vị trí:** `next.config.ts` (dòng 6-8), `public/images/avatar.jpg`, `public/search-index.json`, `public/certificates/*.png`
- **Tác động:** Runtime headers cho thấy public assets đang là `public, max-age=0`. Repeat visits phải revalidate ảnh/JSON ổn định, tạo thêm round trip không cần thiết.
- **Nguyên nhân gốc:** `next.config.ts` chưa có `headers()`. Next đã cache immutable đúng cho asset hashed ở `/_next/static`, nhưng file trong `public/` không versioned nên mặc định revalidate.
- **Khuyến nghị:** Dùng filename có version/hash cho asset public dài hạn và thêm cache headers. Giữ TTL ngắn hơn cho `search-index.json` nếu file này thay đổi độc lập.

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=31536000, immutable'}]
      },
      {
        source: '/certificates/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=31536000, immutable'}]
      },
      {
        source: '/search-index.json',
        headers: [{key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=86400'}]
      }
    ];
  }
};
```

- **Effort:** Low
- **Expected Gain:** Tăng hiệu năng repeat-view và giảm bandwidth.

### [ISSUE-006] Navbar ship code search modal trước khi người dùng cần
- **Hạng mục:** Bundle & Assets / JS Runtime
- **Vị trí:** `src/components/Navbar.tsx` (dòng 13, 21-35, 97-125), `src/components/blog/SearchModal.tsx` (dòng 1-99)
- **Tác động:** Mọi trang locale đều hydrate navbar và kéo theo path search dù search chỉ cần sau khi click. App build manifest cho thấy locale layout có khoảng **492 KB raw client assets**, gồm các chunk navigation không shared trên mọi trang locale.
- **Nguyên nhân gốc:** `SearchModal` được import tĩnh vào `Navbar`, trong khi `Navbar` là root client component.
- **Khuyến nghị:** Dynamic import modal khi mở search. Initial navbar chỉ giữ button search.

```tsx
import dynamic from 'next/dynamic';

const SearchModal = dynamic(() =>
  import('@/components/blog/SearchModal').then((m) => m.SearchModal)
);
```

- **Effort:** Low
- **Expected Gain:** Giảm initial JS cho mọi route; giảm parse/hydration work.

### [ISSUE-007] Comments blog tải third-party code trên mọi post route
- **Hạng mục:** Third-party Scripts / JS Runtime
- **Vị trí:** `src/app/[locale]/blog/[slug]/page.tsx` (dòng 7, 122), `src/components/blog/GiscusComments.tsx` (dòng 3, 21-41)
- **Tác động:** Comment UI nằm cuối bài, nhưng client component và path `@giscus/react` vẫn là một phần của trải nghiệm post. Dù `loading="lazy"`, người không đọc tới comment vẫn trả một phần chi phí hydrate/module.
- **Nguyên nhân gốc:** `GiscusComments` được import và render vô điều kiện ở cuối mọi bài viết.
- **Khuyến nghị:** Lazy-load comments bằng viewport intersection hoặc nút "Show comments". Giữ placeholder server-rendered cho đến khi cần.
- **Effort:** Low-Medium
- **Expected Gain:** Giảm initial và mid-page JS work cho người đọc bài.

### [ISSUE-008] Server-rendered MDX tạo HTML/RSC payload lớn
- **Hạng mục:** Rendering Strategy / Network
- **Vị trí:** `src/app/[locale]/blog/[slug]/page.tsx` (dòng 99-116)
- **Tác động:** Document đo được ở `/en/blog/test-post` là **169 KB raw**. Công thức math và code highlight bằng Shiki sinh nhiều span lồng nhau cùng inline styles, tăng chi phí parse HTML và transfer size.
- **Nguyên nhân gốc:** `MDXRemote` render KaTeX và Shiki trực tiếp vào document. Cách này tốt cho readability không cần JS, nhưng đắt với bài dài nhiều code/math.
- **Khuyến nghị:** Giữ SSR cho text bài viết, nhưng giảm output của highlighter. Có thể dùng class-based highlighting, giới hạn chiều cao code block mặc định, hoặc render ví dụ tương tác khi người dùng yêu cầu. Không nên chuyển toàn bộ content sang CSR; chỉ xử lý phần code/math phình to.
- **Effort:** Medium
- **Expected Gain:** HTML nhỏ hơn và parse document nhanh hơn cho bài technical.

### [ISSUE-009] Ảnh above-the-fold và ảnh card thiếu `sizes` chính xác
- **Hạng mục:** Bundle & Assets / LCP / CLS
- **Vị trí:** `src/components/HeroSection.tsx` (dòng 29-37), `src/components/blog/PostCard.tsx` (dòng 28-35)
- **Tác động:** Ảnh `fill` không có `sizes` có thể khiến browser giả định kích thước render rộng hơn thực tế. Avatar hero chỉ 144-192 px nhưng thiếu `sizes`; ảnh cover post card cũng thiếu `sizes` theo grid column.
- **Nguyên nhân gốc:** `next/image` đã dùng đúng cho dimension/fill, nhưng thiếu `sizes` ở các ảnh responsive quan trọng.
- **Khuyến nghị:** Thêm `sizes` chính xác.

```tsx
<Image
  src="/images/avatar.jpg"
  alt="Leo"
  fill
  priority
  sizes="(max-width: 768px) 144px, 192px"
  className="object-cover"
/>
```

- **Effort:** Low
- **Expected Gain:** Tránh browser chọn ảnh quá lớn; cải thiện nhẹ LCP/bandwidth.

### [ISSUE-010] Scroll handlers có thể tạo main-thread work không cần thiết
- **Hạng mục:** JS Runtime / INP
- **Vị trí:** `src/components/Navbar.tsx` (dòng 29-35), `src/components/ScrollToTopButton.tsx` (dòng 8-15), `src/components/blog/BlogTOC.tsx` (dòng 13-37)
- **Tác động:** Scroll listener của navbar chưa passive và gọi `setScrolled` ở mọi scroll event. `BlogTOC` lặp qua toàn bộ heading và gọi `getElementById`/`offsetTop` khi scroll. Với bài dài, việc này có thể tăng layout work trong lúc scroll và giảm responsiveness.
- **Nguyên nhân gốc:** State scroll được cập nhật trực tiếp từ event handler thay vì dùng CSS sticky/intersection sentinel hoặc guard state transition.
- **Khuyến nghị:** Dùng passive listener, chỉ gọi setter khi boolean thay đổi, và dùng `IntersectionObserver` cho active heading tracking.
- **Effort:** Low-Medium
- **Expected Gain:** Giảm scroll jank và rủi ro INP ở article pages.

### [ISSUE-011] Notion queries chưa paginate và static param generation lặp query tag
- **Hạng mục:** Database & API Layer / Build Performance
- **Vị trí:** `src/lib/notion.ts` (dòng 23-32, 79-82), `scripts/buildSearchIndex.ts` (dòng 27-30), `src/app/[locale]/tags/[tag]/page.tsx` (dòng 12-20)
- **Tác động:** Notion database query mặc định chỉ lấy một page kết quả. Khi content tăng, build/search/tag output có thể thiếu dữ liệu. `generateStaticParams` gọi `getAllTags()` một lần cho mỗi locale dù function này không phụ thuộc locale.
- **Nguyên nhân gốc:** Chưa có vòng lặp `has_more` / `next_cursor`; tag param generation lặp cùng query đã cache theo locale.
- **Khuyến nghị:** Tạo helper `queryAllDatabasePages` và gọi `getAllTags()` một lần bên ngoài vòng lặp locale.
- **Effort:** Medium
- **Expected Gain:** Build đúng khi dữ liệu tăng và giảm Notion API calls trong static generation.

---

## Low Priority / Nice-to-have 🟢

### [ISSUE-012] `html { min-width: 1200px; }` tăng chi phí paint/layout trên mobile
- **Hạng mục:** Rendering Strategy / CLS
- **Vị trí:** `src/app/globals.css` (dòng 115-117)
- **Tác động:** Mobile browser phải layout document rộng 1200 px, dễ gây horizontal overflow và tăng paint area không cần thiết. Điều này cũng bất lợi khi test Core Web Vitals responsive.
- **Nguyên nhân gốc:** Root element bị áp min-width global.
- **Khuyến nghị:** Xóa `min-width` và sửa từng layout bằng responsive grid constraints.
- **Effort:** Low
- **Expected Gain:** Mobile rendering tốt hơn và ít layout work hơn.

### [ISSUE-013] Dead code và dependency không dùng tăng rủi ro bundle trong tương lai
- **Hạng mục:** Bundle & Assets / Build Config
- **Vị trí:** `src/contexts/LanguageContext.tsx` (dòng 13-305), `src/components/Navbar_fixed.tsx`, `src/components/Starfield.tsx`, `package.json` (dòng 19)
- **Tác động:** Các file này hiện không được import bởi active routes nên chưa ảnh hưởng initial bundle đo được. Nhưng chúng tăng chi phí bảo trì và có thể vô tình quay lại client bundle. `flexsearch` được cài nhưng search hiện dùng array filtering trong `src/hooks/useSearch.ts` (dòng 48-55).
- **Nguyên nhân gốc:** Các implementation cũ còn lại sau khi chuyển sang `next-intl` và search đơn giản.
- **Khuyến nghị:** Xóa file/dependency không dùng hoặc thêm TODO có owner rõ ràng. Nếu search sẽ tăng quy mô, dùng thật `flexsearch` và build indexed search artifact.
- **Effort:** Low
- **Expected Gain:** Install size nhỏ hơn và giảm rủi ro bundle phình do import nhầm.

### [ISSUE-014] Script `optimize-images` trỏ tới file không tồn tại
- **Hạng mục:** Build Config / Assets
- **Vị trí:** `package.json` (dòng 10), `scripts/`
- **Tác động:** Repo có workflow tối ưu ảnh nhưng không chạy được. Các PNG certificate đang 165-193 KB mỗi file và icon là 377 KB, nên script thiếu là vấn đề thực tế.
- **Nguyên nhân gốc:** `node scripts/optimize-images.js` được khai báo, nhưng folder `scripts/` chỉ có `scripts/buildSearchIndex.ts`.
- **Khuyến nghị:** Thêm script hoặc xóa command khỏi package. Script nên tạo AVIF/WebP, strip metadata, và fail CI nếu ảnh vượt budget.
- **Effort:** Low
- **Expected Gain:** Ngăn asset regression.

### [ISSUE-015] AppleDouble metadata files đang xuất hiện trong public folders
- **Hạng mục:** Bundle & Assets / Build Hygiene
- **Vị trí:** `public/._lion-logo.jpg`, `public/images/._avatar.jpg`, các file `._*` sinh ra
- **Tác động:** Hiện các file này untracked, nhưng nếu deploy từ working directory hoặc lỡ commit, chúng sẽ thành file public rác 4 KB.
- **Nguyên nhân gốc:** `.gitignore` ignore `.DS_Store` nhưng chưa ignore `._*`.
- **Khuyến nghị:** Thêm `._*` vào `.gitignore` và xóa metadata files khỏi `public/`.
- **Effort:** Low
- **Expected Gain:** Deploy artifact sạch hơn.

### [ISSUE-016] Revalidation endpoint chưa refresh các route phát sinh
- **Hạng mục:** Network & Caching / API Layer
- **Vị trí:** `src/app/api/revalidate/route.ts` (dòng 19-25)
- **Tác động:** Khi update một post, `/feed.xml`, `/sitemap.xml`, và tag pages có thể stale đến khi revalidation riêng chạy.
- **Nguyên nhân gốc:** Endpoint chỉ revalidate blog list hoặc specific post pages.
- **Khuyến nghị:** Revalidate thêm `/feed.xml`, `/sitemap.xml`, và tag pages liên quan, hoặc chuyển cached Notion functions sang tag-based invalidation bằng `revalidateTag('posts')`.
- **Effort:** Low-Medium
- **Expected Gain:** Cache nhất quán hơn sau content updates.

### [ISSUE-017] Vercel Analytics được load global
- **Hạng mục:** Third-party Scripts
- **Vị trí:** `src/app/[locale]/layout.tsx` (dòng 9, 46)
- **Tác động:** Analytics khá nhẹ, nhưng vẫn là third-party client behavior trên mọi page.
- **Nguyên nhân gốc:** `<Analytics />` được mount trong root locale layout.
- **Khuyến nghị:** Giữ nếu giá trị business rõ ràng. Nếu Core Web Vitals có regression, cân nhắc sampling hoặc load analytics sau `requestIdleCallback`.
- **Effort:** Low
- **Expected Gain:** Giảm nhẹ background JS work.

---

## Quick Wins

> Các việc có thể xử lý dưới 30 phút nhưng tác động cao

- [ ] Xóa stylesheet KaTeX jsDelivr bị trùng trong `src/app/[locale]/blog/[slug]/page.tsx`.
- [ ] Thêm `sizes` cho avatar hero và ảnh cover post card.
- [ ] Thêm cache headers cho asset ổn định trong `public/images` và `public/certificates`.
- [ ] Đặt `preload: false` cho font không critical và giảm weight/style của Source Serif.
- [ ] Dynamic import `SearchModal` từ `Navbar`.
- [ ] Thêm `._*` vào `.gitignore` và xóa AppleDouble files khỏi `public/`.
- [ ] Sửa hoặc xóa npm script `optimize-images` đang trỏ tới file thiếu.

---

## Tooling Khuyến Nghị

- **Lighthouse CI**: chạy cho `/en/blog`, `/en/about`, và ít nhất một bài nhiều math/code.
- **`@next/bundle-analyzer`**: kiểm tra chunk theo route và xác nhận Mermaid/Giscus/Search đã được split đúng.
- **Web Vitals collection**: dùng Vercel Speed Insights hoặc `web-vitals` attribution để lấy LCP/CLS/INP thực tế.
- **Bundle budgets trong CI**: fail build nếu First Load JS hoặc route CSS vượt ngưỡng.
- **Image budget check**: kiểm tra kích thước/dung lượng tối đa của `public/` assets và tạo AVIF/WebP variants.
- **Notion API integration test**: mock paginated responses và xác nhận search index/tag generation lấy đủ page.

---

## Tài Liệu Tham Khảo

- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js CDN caching guide](https://nextjs.org/docs/app/guides/cdn-caching)
- [Next.js `headers` config](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers)
- [Next.js Image component](https://nextjs.org/docs/app/api-reference/components/image)
- [web.dev: Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp)
- [web.dev: Fetch Priority API](https://web.dev/articles/fetch-priority)
- [web.dev: Optimize long tasks](https://web.dev/articles/optimize-long-tasks)
- [web.dev: Optimize Interaction to Next Paint](https://web.dev/articles/optimize-inp)
- [MDN: Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
