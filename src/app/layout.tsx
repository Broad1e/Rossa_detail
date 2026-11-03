import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROSSA.DETAIL — Detailing × Wrapping | Санкт-Петербург',
  description: 'ROSSA.DETAIL. Детейлинг, оклейка, покраска и защита автомобиля. Санкт-Петербург. Est. 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
