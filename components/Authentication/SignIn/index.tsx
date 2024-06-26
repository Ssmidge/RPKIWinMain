"use client"
import { Button, Center, Checkbox, Container, Flex, Group, Paper, TextInput, Title } from '@mantine/core';
import classes from './Signin.module.css';
import Link from "next/link";
import { SignInServer } from "../AuthServer";

export function SignIn({ form, emailFloating, setEmailFocused, passwordFloating, setPasswordFocused}: { form: any, emailFloating: boolean, setEmailFocused: any, passwordFloating: boolean, setPasswordFocused: any }) {
  console.log(form.getValues());
  return (
    <>
      <Center>
        <Title order={1} px={"xl"}>Panel authentication</Title>
      </Center>
        {/* <Center> */}
      <Container size="sm" mt="10rem">
        <Center>
        <Paper shadow="xs" radius="md" withBorder p="30px" style={{width: "100%"}}>
          <form onSubmit={form.onSubmit((values: any) => {
            SignInServer(values)
          })}>
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
                {...form.getInputProps('password', {
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
          {/* <div className={classes.inner}> */}
            {/* <div className={classes.content}> */}
            {/* </div> */}
          {/* </div> */}
        {/* </Center> */}
    </>
  );
}