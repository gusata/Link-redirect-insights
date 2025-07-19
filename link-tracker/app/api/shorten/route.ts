import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { url } = await req.json();
  const slug = nanoid(6);

  const link = await prisma.link.create({
    data: { slug, url },
  });

  return NextResponse.json({ short: `${process.env.BASE_URL}/${slug}` });
}
