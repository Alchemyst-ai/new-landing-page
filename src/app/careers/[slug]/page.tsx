import { notFound, redirect } from 'next/navigation';

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tallyUrl = `https://tally.so/r/${slug}`;

  // Check if the Tally page exists by fetching the URL
  const res = await fetch(tallyUrl, { method: 'HEAD' });

  if (res.ok) {
    redirect(tallyUrl);
  } else {
    notFound();
  }
}