import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Harmonic Hounleba',
  description: 'Full-Stack Developer · Entrepreneur · Web Pentester',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%23080808'/><text y='72' x='50' text-anchor='middle' font-size='62' font-family='Arial Black,sans-serif' font-weight='900' fill='%23dc2626'>H</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}