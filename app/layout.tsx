import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./styles/syntax.css";
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css'; 
import { ThemeProvider } from '@/components/theme';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Squared Computing | Firmware Development Consulting",
  description: "Professional firmware development and consulting services in Kenya. Custom solutions for embedded systems, IoT, and hardware integration.",
  keywords: ["firmware development", "consulting", "embedded systems", "IoT", "Kenya", "hardware integration"],
  authors: [{ name: "Squared Computing" }],
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}