import { Container } from '@mantine/core';
import { Hero } from '../components/Hero';
import { Welcome } from '../components/Welcome/Welcome';
import { Navbar } from '../components/layout/Navbar';
import { Dots } from '../components/Dots';
import SessionData from '@/components/Authentication/Session';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

export default async function HomePage() {

  const session = await auth();

  return (
    <>
      <Container>
        <Dots className="dots" style={{ left: 0, top: 60 }} />
        <Dots className="dots" style={{ left: -60, top: 200 }} />
        <Dots className="dots" style={{ right: 0, top: 200 }} />
        <Dots className="dots" style={{ right: 100, top: 600 }} />
      </Container>
      <Hero />
      <SessionData {...{
        session
      }}/>
    </>
  );
}
