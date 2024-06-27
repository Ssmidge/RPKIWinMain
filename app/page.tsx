import { Container } from '@mantine/core';
import { Hero } from '../components/Hero';
import { Dots } from '../components/Dots';
import { auth } from '@/auth';

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
    </>
  );
}
