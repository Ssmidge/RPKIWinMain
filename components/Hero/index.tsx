'use client';

import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '@/public/assets/img/shield.png';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>FREE</span> RPKI <br /> hosting service
          </Title>
          <Text c="dimmed" mt="md">
            Secure your BGP routing with RPKI and BGP Origin Validation
            with a few clicks and no hassle.
          </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                    <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </ThemeIcon>
                }
            >
                <List.Item>
                <b>Krill based</b> – We support the krill API to allow you to manage your ROAs
                through your own automated scripts
                </List.Item>
                <List.Item>
                <b>Free and open source</b> – All of our services run on open source software
                and any proprietary code we write is available on GitHub
                </List.Item>
                <List.Item>
                <b>Notifications</b> – We have extensive configuration options for notifications
                so that you don't miss any important changes to your ROAs
                </List.Item>
            </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}