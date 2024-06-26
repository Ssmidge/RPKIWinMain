import { Container } from '@mantine/core';
import SessionData from '@/components/Authentication/Session';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

export default async function HomePage() {

  const session = await auth();

  return (
    <>
    <SessionData {...{
        session
      }}/>
    </>
  );
}
