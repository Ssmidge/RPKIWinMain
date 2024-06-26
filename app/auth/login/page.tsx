"use client"
import { Container } from '@mantine/core';
import { SignIn } from '@/components/Authentication/SignIn';
import { useState } from 'react';
import { useForm } from '@mantine/form';

export default function HomePage() {

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
  return (
    <>
      <SignIn />
    </>
  );
}
