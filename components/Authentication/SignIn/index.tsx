"use client"
import { Button, Center, Checkbox, Container, Flex, Group, Paper, TextInput, Title } from '@mantine/core';
import classes from './Signin.module.css';
import Link from "next/link";
import { SignInServer } from "../AuthServer";
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export function SignIn() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  
  const [emailFocused, setEmailFocused] = useState(false);
  const emailFloating = form.getValues().email.trim().length !== 0 || emailFocused || undefined;

  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordFloating = form.getValues().password.trim().length !== 0 || passwordFocused || undefined;

  // handle signin

  // check for errors first
  const [loginError, setLoginError] = useState('');
  const queryParams = useSearchParams();
  if(queryParams?.get("error")) {
    setLoginError(queryParams.get("error") as string)
    form.setFieldValue('email', queryParams.get("email") as string)
  }

  async function handleSignIn(values: any) {
    try {
      const res = SignInServer(values)
      res.then((result) => {
        if (result) {
          // redirect to dashboard
          router.push("/dashboard")
        }
      });
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <Center>
        <Title order={1} px={"xl"}>Panel authentication</Title>
      </Center>
      <Container size="sm" mt="10rem">
        <Center>
        <Paper shadow="xs" radius="md" withBorder p="30px" style={{width: "100%"}}>
          <form onSubmit={form.onSubmit((values: any) => {
            handleSignIn(values)
          })}>
            <TextInput
              withAsterisk
                label="Email"
                required
                type="email"
                autoComplete='email'
                classNames={classes}
                data-floating={emailFloating}
                labelProps={{ 'data-floating': emailFloating }}
                placeholder="johndoe@example.com"          
                key={form.key('email')}
                mt="xs"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                id='email'
                {...form.getInputProps('email', {
                  withFocus: false,
                })}
              />
              <TextInput
                withAsterisk
                label="Password"
                required
                autoComplete='current-password'
                type="password"
                classNames={classes}
                data-floating={passwordFloating}
                labelProps={{ 'data-floating': passwordFloating }}
                mt="xl"
                id='password'
                placeholder="1L0v3P@ssw0rds"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                key={form.key('password')}
                {...form.getInputProps('password', {
                  withFocus: false,
                })}
              />
              <Group justify="center" mt="md">
                {
                  loginError ?
                    <p style={{color: "red"}}>{loginError}</p>
                  : null
                }
                <Button type="submit" style={{ width: "100%" }} radius="md" size="md">Submit</Button>
              </Group>

              <Group justify="space-between" mt="md">
                <Link href="/signup">
                  <Button style={{ width: "100%" }} radius="md" size="md" variant="light">Sign up</Button>
                </Link>
                <Link href="/forgot-password">
                  <Button style={{ width: "100%" }} radius="md" size="md" variant="light">Forgot password</Button>
                </Link>
              </Group>
            </form>
          </Paper>
        </Center>
      </Container>
    </>
  );
}