'use client';

import { Card, Text, Title } from '@mantine/core';
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
