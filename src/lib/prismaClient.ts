/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client';

let prisma : PrismaClient;

if (process.env.NODE_ENV === 'development') {
    prisma = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
}

export default prisma;