/* eslint-disable max-len */

'use client';

import { Button, Center, Container, Group, Paper, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from '@mantine/form';
import classes from '@/components/Authentication/SignIn/Signin.module.css';
import { signIn } from '@/components/Authentication/actions';

export default function HomePage() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [emailFocused, setEmailFocused] = useState(false);
  const emailFloating = form.getValues().email?.trim().length !== 0 || emailFocused || undefined;

  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordFloating = form.getValues().password?.trim().length !== 0 || passwordFocused || undefined;

  const [loginError, setLoginError] = useState('');

  function handleSignIn(values: any) {
    const res = signIn(values);
    res.then((response) => {
      if (!response?.error) return;
      setLoginError(response.error.message);
      form.setFieldValue('email', response.error.email);
      form.setFieldValue('password', '');
    });
  }

  return (
    <>
      <Center>
        <Title order={1} px="xl">Panel authentication</Title>
      </Center>
      <Container size="sm" mt="10rem">
        <Center>
        <Paper shadow="xs" radius="md" withBorder p="30px" style={{ width: '100%' }}>
          <form onSubmit={form.onSubmit((values: any) => { handleSignIn(values); })}>
            <TextInput
              withAsterisk
              label="Email"
              required
              type="email"
              autoComplete="email"
              classNames={classes}
              data-floating={emailFloating}
              labelProps={{ 'data-floating': emailFloating }}
              placeholder="johndoe@example.com"
              key={form.key('email')}
              mt="xs"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              id="email"
              {...form.getInputProps('email', {
                  withFocus: false,
                })}
              />
              <TextInput
                withAsterisk
                label="Password"
                required
                type="password"
                autoComplete="current-password"
                classNames={classes}
                data-floating={passwordFloating}
                labelProps={{ 'data-floating': passwordFloating }}
                placeholder="1L0v3P@ssw0rds"
                key={form.key('password')}
                mt="xl"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                id="password"
                {...form.getInputProps('password', {
                  withFocus: false,
                })}
              />
              <Group justify="center" mt="md">
                {
                  loginError ?
                    <p style={{ color: 'red' }}>{loginError}</p>
                  : null
                }
                <Button type="submit" style={{ width: '100%' }} radius="md" size="md">Submit</Button>
              </Group>

              <Group justify="space-between" mt="md">
                <Link href="/signup">
                  <Button style={{ width: '100%' }} radius="md" size="md" variant="light">Sign up</Button>
                </Link>
                <Link href="/forgot-password">
                  <Button style={{ width: '100%' }} radius="md" size="md" variant="light">Forgot password</Button>
                </Link>
              </Group>
          </form>
        </Paper>
        </Center>
      </Container>
    </>
  );
}
