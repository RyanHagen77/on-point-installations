import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'On Point Installations, Inc. — Commercial Office Furniture Installer in Chicago, IL';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#800000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 62,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 28,
            letterSpacing: '-1px',
          }}
        >
          On Point Installations, Inc.
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 30,
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          Commercial Office Furniture Installer — Chicago, IL
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 22,
            marginTop: 36,
          }}
        >
          (847) 550-4042 · onpointinstallations.com
        </div>
      </div>
    ),
    { ...size }
  );
}
