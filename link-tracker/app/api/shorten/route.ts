import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL inválida' }, { status: 400 });

    const slug = nanoid(6);

    const link = await prisma.link.create({
      data: {
        url,
        slug, // variável slug com valor gerado
      },
    });

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return NextResponse.json({ short: `${baseUrl}/${slug}` });
  } catch (error) {
    console.error('Erro na API shorten:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
