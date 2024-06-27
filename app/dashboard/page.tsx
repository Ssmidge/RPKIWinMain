import { Button } from '@mantine/core';
import SessionData from '@/components/Authentication/Session';
import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  const makeEdgeRequest = async () => {
    const res = await fetch('/api/v1/edge');
    const json = res.json();
    console.log(json);
  };

  return (
    <>
      <SessionData {...{ session }} />
      <div className="mt-12">
        <Button onClick={makeEdgeRequest}>Make edge request</Button>
      </div>

    </>
  );
}
