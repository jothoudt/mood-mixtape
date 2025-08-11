'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { SessionProvider } from 'next-auth/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ReduxProvider>
          <div className="container mx-auto px-4">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
