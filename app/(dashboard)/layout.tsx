import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { theme } from '@/theme';
import '@/app/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { auth } from '@/auth';

export const metadata = {
  title: 'RPKI.Win - Dashboard',
  description: 'A hosted RPKI authority service for your hobby network!',
};

export default async function RootLayout({ children }: { children: any }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <SessionProvider>
            <Navbar {...{
              session,
            }} />
            {children}
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
