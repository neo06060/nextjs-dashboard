// /app/layout.tsx
import './global.css';
import { Metadata } from 'next';
import { lusitana } from './ui/fonts';
import SideNav from './ui/dashboard/sidenav';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  openGraph: {
    title: 'Acme Dashboard',
    description: 'The official Next.js Learn Dashboard built with App Router.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Acme Dashboard',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Acme Dashboard',
    description: 'The official Next.js Learn Dashboard built with App Router.',
    images: ['/opengraph-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lusitana.className}>
        {children}
      </body>
    </html>
  );
}
