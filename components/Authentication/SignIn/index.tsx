"use client"

import { signIn } from "@/auth"
import { Button, Center, Checkbox, Container, Flex, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './SignIn.module.css';
import { useState } from "react";

export function SignIn() {
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
  const emailFloating = form.values.email.trim().length !== 0 || emailFocused || undefined;

  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordFloating = form.values.password.trim().length !== 0 || passwordFocused || undefined;

  return (
    <>
      <Center>
        <Title order={1}>Panel authentication</Title>
      </Center>
        <Center>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Paper shadow="xs" radius="md" withBorder p="30px" style={{width: "200%"}}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    withAsterisk
                    label="Email"
                    required
                    classNames={classes}
                    data-floating={emailFloating}
                    labelProps={{ 'data-floating': emailFloating }}
                    placeholder="johndoe@example.com"          
                    key={form.key('email')}
                    mt="xs"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    {...form.getInputProps('email', {
                      withFocus: false,
                    })}
                  />
                  <TextInput
                    withAsterisk
                    label="Password"
                    required
                    classNames={classes}
                    data-floating={passwordFloating}
                    labelProps={{ 'data-floating': passwordFloating }}
                    mt="xl"
                    placeholder="1L0v3P@ssw0rds"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    key={form.key('password')}
                    {...form.getInputProps('email', {
                      withFocus: false,
                    })}
                  />

                  <Checkbox
                    mt="md"
                    label="I accept the terms of service"
                    key={form.key('termsOfService')}
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                  />

                  <Group justify="center" mt="md">
                    <Button type="submit" style={{ width: "100%" }} radius="md" size="md">Submit</Button>
                  </Group>
                </form>
              </Paper>
            </div>
          </div>
        </Center>
    </>
  );
}