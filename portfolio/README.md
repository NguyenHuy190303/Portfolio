# 🚀 Nguyen Quoc Huy - Portfolio Website

<p align="center">
  <img src="./public/Leo-avatar.jpg" alt="Nguyen Quoc Huy" width="200" height="200" style="border-radius: 50%; border: 3px solid #00ffff;">
</p>

<h2 align="center">Research Engineer | AI Researcher | Innovation Builder</h2>

<p align="center">
  A modern, cyberpunk-themed portfolio website showcasing my journey as a Research Engineer passionate about artificial intelligence and scientific research.
</p>

<p align="center">
  <a href="https://github.com/NguyenHuy190303/Portfolio">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/huy-nguyen-5552b22aa/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:nguyenhuy190303@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

---

## 🎯 **About This Portfolio**

This portfolio website represents my professional journey and technical expertise, featuring a cyberpunk-themed design that reflects my passion for cutting-edge technology. Built with modern web technologies, it showcases my projects, research, and achievements in artificial intelligence and software development.

---

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **Next.js 15.3.5** - React framework with App Router
- **React 19.0.0** - Modern React with latest features
- **TypeScript 5** - Type-safe JavaScript development

### **Styling & Design**
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Custom CSS** - Cyberpunk animations and effects
- **PostCSS** - CSS processing and optimization
- **Responsive Design** - Mobile-first approach

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **Sharp** - High-performance image processing
- **Turbopack** - Fast development bundler
- **Autoprefixer** - CSS vendor prefix automation

### **Features**
- ⚡ **Server-Side Rendering (SSR)**
- 🌐 **Internationalization** (Vietnamese/English)
- 🎨 **Cyberpunk UI/UX** with neon effects
- 📱 **Fully Responsive** design
- ✨ **Smooth Animations** and transitions
- 🚀 **Performance Optimized**
- 📊 **Dynamic Content** management

---

## 🏗️ **Project Structure**

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles & cyberpunk theme
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── HeroSection.tsx    # Main hero section
│   │   ├── AboutSection.tsx   # About me section
│   │   ├── SkillsSection.tsx  # Technical skills
│   │   ├── ExperienceSection.tsx  # Work experience
│   │   ├── ProjectsSection.tsx     # Featured projects
│   │   ├── PublicationsSection.tsx # Research publications
│   │   ├── CertificatesSection.tsx # Certifications
│   │   ├── ContactSection.tsx      # Contact information
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── LanguageSwitcher.tsx    # Language toggle
│   ├── contexts/              # React contexts
│   │   └── LanguageContext.tsx     # Internationalization
│   ├── data/                  # Static data
│   │   └── certificates.ts    # Certificates data
│   └── hooks/                 # Custom React hooks
│       └── useScrollAnimation.ts   # Scroll animations
├── public/                    # Static assets
│   ├── certificates/          # Certificate images
│   ├── Leo-avatar.jpg        # Profile image
│   └── Nguyen_Huy_CV.pdf     # Resume/CV
├── scripts/                   # Build scripts
│   └── optimize-images.js     # Image optimization
└── Certificate/               # Certificate originals
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/NguyenHuy190303/Portfolio.git
cd Portfolio/portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

### **Available Scripts**

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run optimize-images` - Optimize images

---

## 🎨 **Design Features**

### **Cyberpunk Theme**
- **Neon Color Palette**: Cyan, pink, and green accents
- **Glowing Effects**: Text shadows and border glows
- **Matrix-Style Animations**: Falling code rain
- **Holographic Elements**: 3D transforms and gradients
- **Terminal Aesthetics**: Monospace fonts and command-line styling

### **Interactive Elements**
- **Typing Animation**: Dynamic role titles
- **Hover Effects**: Scale and glow transformations
- **Scroll Animations**: Fade-in and slide effects
- **Progress Indicators**: Scroll progress bar
- **Smooth Scrolling**: Section navigation

### **Responsive Design**
- **Mobile-First**: Optimized for all devices
- **Flexible Grid**: Tailwind CSS responsive utilities
- **Touch-Friendly**: Large interactive areas
- **Performance**: Optimized images and lazy loading

---

## 🌐 **Internationalization**

The portfolio supports multiple languages:

- **English** - Primary language
- **Vietnamese** - Native language support

Language switching is seamless with persistent user preference.

---

## 📊 **Sections Overview**

### **Hero Section**
- Dynamic typing animation with multiple roles
- Terminal-style initialization sequence
- Call-to-action buttons for CV and contact
- Social media links

### **About Section**
- Personal introduction and background
- Professional journey and goals
- Research interests and passion areas

### **Skills Section**
- Technical skills with proficiency levels
- Programming languages and frameworks
- Tools and technologies

### **Experience Section**
- Professional work experience
- Research positions and leadership roles
- Key achievements and responsibilities

### **Projects Section**
- Featured projects with descriptions
- Technology stacks used
- Live demos and source code links

### **Publications Section**
- Research papers and publications
- Conference presentations
- Academic contributions

### **Certificates Section**
- Professional certifications
- Online course completions
- Skill validations with filtering

### **Contact Section**
- Contact information and social links
- Direct messaging capabilities
- Location and availability

---

## 🔧 **Customization**

### **Theme Colors**
Edit `src/app/globals.css` to modify the cyberpunk color scheme:

```css
:root {
  --accent: #00ffff;        /* Neon cyan */
  --accent-secondary: #00ff41;  /* Matrix green */
  --accent-tertiary: #ff0080;   /* Hot pink */
  /* ... more colors */
}
```

### **Content Management**
- **Language files**: `src/contexts/LanguageContext.tsx`
- **Certificates**: `src/data/certificates.ts`
- **Images**: `public/` directory
- **Personal info**: Update throughout components

### **Animations**
Modify animations in `src/app/globals.css`:
- Typing effects
- Neon flicker animations
- Floating particle movements
- Scroll-triggered animations

---

## 📈 **Performance Optimizations**

- **Next.js 15** with App Router for optimal rendering
- **Image Optimization** with Next.js Image component
- **Code Splitting** for faster loading
- **CSS Optimization** with Tailwind purging
- **Font Optimization** with system fonts
- **Lazy Loading** for images and components

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm run build
```
Deploy directly from GitHub repository on Vercel.

### **Other Platforms**
The built static files in `.next` can be deployed to:
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 **About the Developer**

**Nguyen Quoc Huy** is a Research Engineer passionate about artificial intelligence and scientific research. Currently completing B.Eng in Information Technology in Helsinki, Finland, with expertise in:

- **Artificial Intelligence & Machine Learning**
- **Natural Language Processing**
- **Large Language Models (LLMs)**
- **Full-Stack Development**
- **Research & Innovation**

---

<p align="center">
  <strong>🌟 If you like this portfolio, please consider giving it a star! 🌟</strong>
</p>

<p align="center">
  Made with ❤️ and lots of ☕ by <a href="https://github.com/NguyenHuy190303">Nguyen Quoc Huy</a>
</p>
