import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      <Link 
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return to Home
      </Link>
    </div>
  );
} 