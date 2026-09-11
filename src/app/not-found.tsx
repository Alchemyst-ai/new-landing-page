import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      <p className="text-sm text-muted-foreground mb-6 max-w-xl">
        {/* Agent recovery hint — plain-text markdown-style index for crawlers and AI agents */}
        # Page not found. Try these public indexes instead:
        - Homepage: https://getalchemystai.com/
        - Sitemap: https://getalchemystai.com/sitemap.xml
        - LLM index: https://getalchemystai.com/llms.txt
        - Full content: https://getalchemystai.com/llms-full.txt
        - Docs: https://getalchemystai.com/docs
        - API spec: https://getalchemystai.com/openapi.json
        - About: https://getalchemystai.com/about
        - Contact: https://getalchemystai.com/contact
        - Privacy: https://getalchemystai.com/privacy
      </p>
      <nav aria-label="404 recovery" className="flex flex-wrap gap-3 justify-center mb-6 text-sm">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
        <Link href="/sitemap.xml" className="text-blue-500 hover:text-blue-700 underline">
          Sitemap
        </Link>
        <Link href="/llms.txt" className="text-blue-500 hover:text-blue-700 underline">
          llms.txt
        </Link>
        <Link href="/llms-full.txt" className="text-blue-500 hover:text-blue-700 underline">
          llms-full.txt
        </Link>
        <Link href="/docs" className="text-blue-500 hover:text-blue-700 underline">
          Docs
        </Link>
        <Link href="/openapi.json" className="text-blue-500 hover:text-blue-700 underline">
          API spec
        </Link>
        <Link href="/about" className="text-blue-500 hover:text-blue-700 underline">
          About
        </Link>
        <Link href="/contact" className="text-blue-500 hover:text-blue-700 underline">
          Contact
        </Link>
        <Link href="/privacy" className="text-blue-500 hover:text-blue-700 underline">
          Privacy
        </Link>
      </nav>
    </div>
  );
} 