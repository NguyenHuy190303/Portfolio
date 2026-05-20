'use client';

interface LocalHtmlEmbedProps {
  src: string;
  height?: string;
  title?: string;
}

export function LocalHtmlEmbed({ src, height = '90vh', title = 'Interactive content' }: LocalHtmlEmbedProps) {
  return (
    <div className="my-6 rounded-xl border border-border overflow-hidden">
      <iframe
        src={src}
        title={title}
        style={{ width: '100%', height, border: 'none', display: 'block' }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
