'use client';

import {
 ActionIcon,
 Avatar,
 Button,
 Card,
 Flex,
 Group,
 Menu,
 Space,
 Stack,
 Text,
 Title,
} from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { Session } from 'next-auth';

const sectionStyle = {
 padding: 'var(--mantine-spacing-md)',
 borderTop: '1px solid lightdark(var(--mantine-colors-gray-3), var(--mantine-colors-dark-4))',
};

export function ProfileCard({ session }: { session: Session | null }) {
 return (
  <Card radius="md">
    <Card.Section style={sectionStyle}>
    <Group justify="space-between">
        <Avatar radius="xl"></Avatar>
    </Group>

    <Space h="md" />

    <Flex direction="column">
        <Title order={5}>{session?.user?.name}</Title>
        <Space h="xs" />
        <Text fz="sm" c="dimmed" fw="500">
        {session?.user?.email || ''}
        </Text>
    </Flex>
    </Card.Section>

    <Card.Section style={sectionStyle}>
    <Group grow>
        <Stack gap={4}>
        <Text fz="sm" fw="500">
        ASNs
        </Text>
        <Title order={3}>0</Title>
        </Stack>
        <Stack gap={4}>
        <Text fz="sm" fw="500">
        ROAs
        </Text>
        <Title order={3}>1</Title>
        </Stack>
    </Group>
    </Card.Section>

    <Card.Section style={sectionStyle}>
    <Group>
        <Button variant="light">Create ROA</Button>
        <Button>Open Krill</Button>
    </Group>
    </Card.Section>
  </Card>
 );
}
