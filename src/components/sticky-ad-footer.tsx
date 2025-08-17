import Link from "next/link";

export default function StickyAdFooter() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t bg-card/90 backdrop-blur">
      <div className="mx-auto w-full max-w-screen-xl px-3 sm:px-6 py-2">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Advertisement:</span> Unlock advanced insights with Alchemyst AI Pro.
          <Link href="/pricing" className="ml-2 text-primary underline">
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
} 