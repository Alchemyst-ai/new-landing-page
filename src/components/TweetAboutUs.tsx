"use client";

import Link from "next/link";

export default function TweetAboutUs() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
        We’d love to hear from you!
      </h2>

      <p className="mt-4 text-lg text-gray-400 max-w-2xl">
        Share your feedback with us — tell us what you think about{" "}
        {/* <span className="font-bold text-gray-400">Alchemyst</span>. */}
            <Link
            href="https://platform.getalchemystai.com"
            target="_blank"
            className="inline-flex items-center space-x-1 underline"
            >
            <span className="font-semibold text-gray-400 hover:text--white transition-colors pr-1">
                Alchemyst
            </span>
            </Link>
        Leave a review, suggest a feature, or tweet us your thoughts.
      </p>

      <p className="mt-2 text-gray-400 text-sm">
        We read every message, keep it coming!
      </p>

      <Link
        href="https://x.com/getalchemyst"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center space-x-2 border-[1px] border-gray-500 text-white font-medium py-2.5 px-5 rounded-full shadow hover:border-[#d98622] hover:text-[#d98622] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1227"
          className="w-5 h-5 fill-current"
        >
          <path d="M714.163 519.284L1160.89 0H1055.03L666.111 450.887L355.407 0H0L468.611 681.821L0 1226.37H105.864L515.153 748.681L844.593 1226.37H1200L714.137 519.284H714.163ZM570.816 686.875L520.771 615.894L144.065 79.6875H305.963L608.92 511.287L658.965 582.268L1055.06 1150.81H893.162L570.816 686.875Z" />
        </svg>
        <span>Tweet @getalchemyst</span>
      </Link>
    </section>
  );
}
