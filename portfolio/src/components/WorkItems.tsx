export function WorkItems({ items }: { items: string[] }) {
  return (
    <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-3">
      {items.map((item, i) => {
        const [title, ...rest] = item.split(' — ');
        return (
          <div key={title} className="border-t border-foreground pt-[26px]">
            <div className="font-serif text-[52px] font-light italic leading-none text-primary lining-nums lg:text-[64px]">0{i + 1}</div>
            <h3 className="mt-5 mb-3 text-[26px] leading-tight">{title}</h3>
            <p className="text-[15px] first-letter:uppercase">{rest.join(' — ')}</p>
          </div>
        );
      })}
    </div>
  );
}
