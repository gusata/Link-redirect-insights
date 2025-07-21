import { prisma } from '../lib/prisma';
import { redirect } from 'next/navigation';


export default async function RedirectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

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
