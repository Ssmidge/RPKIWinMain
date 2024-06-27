import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';

// set runtime to Edge
// export const runtime = 'edge';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);

  if (!session) {
    return NextResponse.json({ error: 'not signed in' }, { status: 401 });
  }

  return NextResponse.json({ data: 'you got it' }, { status: 200 });
}
