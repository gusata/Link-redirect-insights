import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function RedirectPage(context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;

  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link) return redirect('/');

  await prisma.link.update({
    where: { slug },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.url);
}
