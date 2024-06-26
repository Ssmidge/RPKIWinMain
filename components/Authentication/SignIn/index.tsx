"use client"

import { signIn } from "@/auth"
import { Button, Center, Checkbox, Container, Flex, Group, Paper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './SignIn.module.css';
import { useState } from "react";

export function SignIn() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const emailFloating = emailValue.trim().length !== 0 || emailFocused || undefined;

  return (
    <Container size="md">
      <Center>
        <Flex>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Paper shadow="xs" radius="md" withBorder p="30px">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    withAsterisk
                    label="Email"
                    required
                    data-floating={emailFloating}
                    labelProps={{ 'data-floating': emailFloating }}
                    placeholder="johndoe@example.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                  <TextInput
                    withAsterisk
                    label="Password"
                    placeholder="1L0v3P@ssw0rds"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                  />

                  <Checkbox
                    mt="md"
                    label="I accept the terms of service"
                    key={form.key('termsOfService')}
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                  />

                  <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
                </form>
              </Paper>
            </div>
          </div>
        </Flex>
      </Center>
    </Container>
  );
}