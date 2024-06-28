import { Button } from '@mantine/core';
import SessionData from '@/components/Authentication/Session';
import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <SessionData {...{ session }} />

    </>
  );
}
