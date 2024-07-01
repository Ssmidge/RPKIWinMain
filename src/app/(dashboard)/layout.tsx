/* eslint-disable no-restricted-globals */
'use client';

import '@mantine/core/styles.css';
import React, { useEffect } from 'react';
import { Anchor, AppShell, Burger, Center, Text, useMantineTheme } from '@mantine/core';
import '@/app/styles/globals.css';
import { useDisclosure } from '@mantine/hooks';
import { SessionContextValue, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/AuthenticatedNavbar';
import { navItems } from '@/config';
import { DashboardHeader } from '@/components/layout/AuthenticatedHeader';

export default function RootLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const router = useRouter();
  const session : SessionContextValue = useSession();

  useEffect(() => {
    if (session && !(['authenticated', 'loading'].includes(session.status))) location.reload();
  }, [session, router]);

  const bg = theme.colors.dark[7];

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        transitionDuration={500}
        transitionTimingFunction="ease"
    >
      <AppShell.Navbar>
        <Navbar data={navItems} hidden={!opened} session={session} />
      </AppShell.Navbar>
      <AppShell.Header>
        <DashboardHeader
          burger={<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr="xl" />}
        />
      </AppShell.Header>
      <AppShell.Main bg={bg}>{children}</AppShell.Main>
      <AppShell.Footer>
        <Center>
          <Anchor href="https://github.com/Ssmidge/RPKIWinMain" underline="never">
            <Text w="full" size="sm" c="white">
              Copyright © {new Date().getFullYear()} RPKI.Win
            </Text>
          </Anchor>
        </Center>
      </AppShell.Footer>
      </AppShell>
    </>
  );
}
