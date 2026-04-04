import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Payoff: Smart Debt Planner — AI Coach, Snowball & Savings'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const treeData = await readFile(join(process.cwd(), 'public/tree.png'), 'base64')
  const treeSrc = `data:image/png;base64,${treeData}`

  const nunitoData = await readFile(
    join(process.cwd(), 'node_modules/@fontsource/nunito/files/nunito-latin-700-normal.woff')
  ).catch(() => null)

  const fonts = nunitoData
    ? [{ name: 'Nunito', data: nunitoData, style: 'normal' as const, weight: 700 as const }]
    : []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF8F4 0%, #FFF0E8 50%, #FFF8F4 100%)',
          padding: '60px 80px',
          gap: '60px',
        }}
      >
        {/* Tree image — large */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img src={treeSrc} height="420" />
        </div>

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '20px',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontFamily: fonts.length ? 'Nunito' : 'sans-serif',
              fontWeight: 700,
              color: '#005235',
              lineHeight: 1.15,
            }}
          >
            Payoff
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: fonts.length ? 'Nunito' : 'sans-serif',
              fontWeight: 700,
              color: '#333',
              lineHeight: 1.3,
            }}
          >
            Smart Debt Planner
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: fonts.length ? 'Nunito' : 'sans-serif',
              color: '#666',
              lineHeight: 1.5,
              marginTop: '4px',
            }}
          >
            AI Coach &bull; Snowball &amp; Avalanche &bull; Savings Planner
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            {['Focus Mode', 'Partner Hub', '7 Strategies'].map((label) => (
              <div
                key={label}
                style={{
                  background: '#005235',
                  color: '#fff',
                  fontSize: 16,
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontFamily: fonts.length ? 'Nunito' : 'sans-serif',
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  )
}
