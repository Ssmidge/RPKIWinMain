'use client';

import { Card, List, Space, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Session } from 'next-auth';

export function WelcomeCard({ session }: { session: Session | null }) {
    return (
    <Card radius="md">
        <Title order={5}>Welcome back,</Title>
        <Text fz="sm" c="dimmed" fw="500">
            {session?.user?.name || ''}
        </Text>
    </Card>
    );
}
