import { prisma } from '../../lib/prisma';

import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';



export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.url) {
      return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 });
    }

    const slug = nanoid(6);

    const link = await prisma.link.create({
      data: { slug, url: body.url },
    });

    const baseUrl = process.env.BASE_URL || 'https://link-redirect-insights.vercel.app/'; // fallback

    return NextResponse.json({ short: `${baseUrl}/${slug}` });
  } catch (error) {
    console.error('Erro em /api/shorten:', error);
    return NextResponse.json(
      { error: 'Erro interno ao encurtar URL' },
      { status: 500 }
    );
  }
}
