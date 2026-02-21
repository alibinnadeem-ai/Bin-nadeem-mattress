import type { Metadata } from 'next';
import React from 'react';
import AIAgentContainer from '@/components/AI/AIAgentContainer';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bin Nadeem Mattress House - Sleep Science For Better Rest',
  description: 'Bin Nadeem Mattress House - Premium mattresses engineered for South Asian bodies. 10-year warranty, 60-day trial, sleep specialists.',
  keywords: 'mattress, sleep, comfort, warranty, Pakistan, Islamabad, Bin Nadeem',
  openGraph: {
    title: 'Bin Nadeem Mattress House - Sleep Science For Better Rest',
    description: 'Bin Nadeem Mattress House - Premium mattresses engineered for South Asian bodies. 10-year warranty, 60-day trial.',
    type: 'website',
    url: 'https://binnadeem.pk',
    siteName: 'Bin Nadeem Mattress House'
  },
  alternates: {
    canonical: 'https://binnadeem.pk'
  }
};

/**
 * ROOT LAYOUT
 * Global layout for all pages
 * 
 * Features:
 * - AI Agent initialization at root level
 * - Global styles
 * - Metadata for SEO
 * - Font imports
 * - HTML/Body structure
 */

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a5f" />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="bg-white text-gray-900 font-sans">
        <CartProvider>
          {/* AI Agent - Available on all pages */}
          <AIAgentContainer enabled={true} />
          
          {/* Cart Sidebar */}
          <CartDrawer />

          {/* Main Content */}
          {children}
        </CartProvider>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global analytics helper
              window.trackEvent = function(eventName, eventData) {
                if (window.gtag) {
                  gtag('event', eventName, eventData);
                }
              };
            `,
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
