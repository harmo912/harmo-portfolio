import './globals.css'

export const metadata = {
  title: 'Harmonic Hounleba',
  description: 'Full-Stack Developer · Entrepreneur · Web Pentester',
}

export default function RootLayout({ children }) {
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