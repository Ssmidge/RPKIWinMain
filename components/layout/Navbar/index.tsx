'use client';

import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
  } from '@tabler/icons-react';
  import classes from './Navbar.module.css';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import { Session } from 'next-auth';
import { SignOutServer } from '@/components/Authentication/AuthServer';

  const features = [
    {
      icon: IconCode,
      title: 'Open source',
      description: 'All of the software we use or have created is fully open source',
    },
    {
      icon: IconCoin,
      title: 'Free for everyone',
      description: 'We operate using donations and sponsorships from our users, so everything is free for everyone!',
    },
    {
      icon: IconBook,
      title: 'Documentation',
      description: 'We have detailed documentation for all of our software, so you can get started quickly, even self-hosting it!',
    },
    {
      icon: IconFingerprint,
      title: 'Security',
      description: 'We use Bcrypt and SHA-512 to hash all user passwords, if any breach occurs, a notification will be sent as fast as possible to everyone',
    },
    {
      icon: IconChartPie3,
      title: 'Analytics',
      description: 'We don\'t collect much data, just the required minimum to keep the service running, and we don\'t sell it to anyone!',
    },
    {
      icon: IconNotification,
      title: 'Notifications',
      description: 'As a small team, we know what it feels like to not know what\'s going on, so we send notifications for everything that happens!',
    },
  ];

  export function Navbar({ session }: { session: Session | null }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = features.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));

    return (
      <Box pb={60}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <MantineLogo size={30} />

            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="/" className={classes.link}>
                Home
              </a>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          What are you waiting for? Let's get started!
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className={classes.link}>
                Learn
              </a>
            </Group>

            <Group visibleFrom="sm">
                {
                    session?.user ? (
                        <Group>
                            <Link href="/dashboard"><Button variant="outline">Dashboard</Button></Link>
                            <Button onClick={() => SignOutServer()} variant="default">Sign out</Button>
                        </Group>
                    ) : (
                        <Group>
                            <Link href="/auth/signin"><Button variant="default">Log in</Button></Link>
                            <Button>Sign up</Button>
                        </Group>
                    )
                }
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }