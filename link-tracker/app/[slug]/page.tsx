import { redirect } from 'next/navigation';
import { prisma } from '../lib/prisma'; // use singleton

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link) return redirect('/');

  await prisma.link.update({
    where: { slug },
    data: { clicks: { increment: 1 } },
  });

  return redirect(link.url); // ou apenas `redirect(link.url);` também funciona
}
