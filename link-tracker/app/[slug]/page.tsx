import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function RedirectPage({ params }: { params: { slug: string } }) {
  // Forçar aguardar (exemplo)
  const slug = await Promise.resolve(params.slug);

  const link = await prisma.link.findFirst({
  where: { slug },
});


  if (!link) {
    return redirect('/'); // Se slug não existir, vai para home
  }

  redirect(link.url); // Redireciona para a URL original
}
