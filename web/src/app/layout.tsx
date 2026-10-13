import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Nest Portal', description: 'A Next.js dashboard connected to a NestJS API.' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return <html lang="th"><body>{children}</body></html>;
}
