import { siteConfig } from '@/config/site';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? siteConfig.name ?? 'Blog';
  const date = searchParams.get('date') ?? '';

  const geistFontData = await fetch(new URL('../../assets/fonts/GeistVF.woff', import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '64px',
        background: '#09090b',
        fontFamily: 'Geist',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            color: '#71717a',
            margin: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.name}
        </p>
        <h1
          style={{
            fontSize: title.length > 60 ? '40px' : '56px',
            fontWeight: 700,
            color: '#fafafa',
            margin: 0,
            lineHeight: 1.1,
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>
        {date && (
          <p style={{ fontSize: '18px', color: '#71717a', margin: 0 }}>
            {new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Geist', data: geistFontData, weight: 400 }],
    }
  );
}
