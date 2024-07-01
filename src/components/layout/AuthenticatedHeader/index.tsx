'use client';

import { Box, Button } from '@mantine/core';
import { signOut } from 'next-auth/react';
import classes from './Header.module.css';
import { Logo } from '../Logo';

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
