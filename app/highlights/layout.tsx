export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={`font-satoshi max-w-screen overflow-x-hidden`}>
          {children}
        </body>
      </html>
    );
  }
  