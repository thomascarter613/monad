import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config/site';

export const runtime = 'edge';

const size = { width: 1200, height: 630 };

function clean(value: string | null, fallback: string, maximum: number) {
  const text = value?.trim() || fallback;
  return text.slice(0, maximum);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = clean(url.searchParams.get('title'), siteConfig.name, 120);
  const identifier = clean(url.searchParams.get('id'), 'ENGINEERING LOG', 48);
  const section = clean(url.searchParams.get('section'), 'MONAD', 48);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f8f5ee',
        color: '#201d19',
        padding: '64px 72px',
        border: '18px solid #201d19',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace' }}>
        <span style={{ fontSize: 24, letterSpacing: 4, color: '#9a5c31' }}>{identifier}</span>
        <span style={{ fontSize: 22, letterSpacing: 3 }}>{section.toUpperCase()}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: title.length > 72 ? 54 : 66, lineHeight: 1.08, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ width: 180, height: 8, background: '#9a5c31' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace' }}>
        <span style={{ fontSize: 22 }}>{siteConfig.name}</span>
        <span style={{ fontSize: 18, letterSpacing: 2 }}>ARCHITECTURE · DECISIONS · EVIDENCE</span>
      </div>
    </div>,
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
      },
    },
  );
}
