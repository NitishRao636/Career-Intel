import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CareerIntel — AI Career Intelligence Platform',
  description: 'Build resumes, optimize for ATS, prepare for interviews, manage job applications, and accelerate your career with AI.',
  keywords: ['resume builder', 'ATS optimizer', 'career platform', 'AI career coach', 'job tracker'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'rounded-xl border border-zinc-200 dark:border-zinc-800',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
