import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import '@app/styles/style.css';

const nunitoSans = Nunito_Sans({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Личный кабинет студента',
    default: 'Личный кабинет студента',
  },
  description:
    'Личный кабинет студента - удобное приложение для работы с учебной организацией',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru' className={`${nunitoSans.className}`}>
      <body>{children}</body>
    </html>
  );
}
