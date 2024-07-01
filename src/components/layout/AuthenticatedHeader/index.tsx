'use client';

import { ActionIcon, Box, Button, Drawer, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconSettings } from '@tabler/icons-react';
import classes from './Header.module.css';
import { Logo } from '../Logo';
import { signOut } from 'next-auth/react';

interface Props {
  burger?: React.ReactNode;
}

export function DashboardHeader({ burger }: Props) {

  return (
    <header className={classes.header}>
        {burger && burger}
        <Logo />
        <Box style={{ flex: 1 }} />
        <Button onClick={() => signOut()} variant="default">Sign out</Button>
    </header>
  );
}
