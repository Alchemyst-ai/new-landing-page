import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CareerApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const tallyUrl = `https://tally.so/r/${slug}`;

  const res = await fetch(tallyUrl, { method: "HEAD" });

  if (res.ok) {
    redirect(tallyUrl);
  } else {
    notFound();
  }
}
