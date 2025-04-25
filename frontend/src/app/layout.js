// app/layout.js
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ListingsProvider } from '@/context/ListingsContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${inter.className} bg-white text-gray-800 bg-subtle-pattern`}>
        <ThemeProvider>
          <AuthProvider>
            <ListingsProvider>
              <WishlistProvider>
                <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 bg-subtle-pattern">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </ListingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
