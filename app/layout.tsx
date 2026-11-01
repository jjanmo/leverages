import type { Metadata } from 'next';
import { ThemeProvider, AuthProvider } from '@/shared/ui';
import { getCurrentUser } from '@/shared/lib/supabase/server';
import AppHeader from './_components/AppHeader';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Leverages', template: '%s | Leverages' },
  description: `Leverages is a toolkit for leveraged investing.

From signal-based strategies to systematic buying plans,
Leverages brings together the tools you need
to build, test, and run your own leveraged investment system.`,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const user = await getCurrentUser();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-canvas antialiased">
        <ThemeProvider>
          <AuthProvider user={user ?? null}>
            <AppHeader />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
