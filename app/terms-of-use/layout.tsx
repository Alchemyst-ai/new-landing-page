import localFont from "next/font/local";
import "../globals.css";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} font-satoshi max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
