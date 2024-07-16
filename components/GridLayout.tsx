export default function GridLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid-background">
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(11,11,9,1), rgba(11,11,9,0), rgba(11,11,9,0), rgba(11,11,9,1)),linear-gradient(rgba(11,11,9,1), rgba(11,11,9,0), rgba(11,11,9,0), rgba(11,11,9,1))",
        }}
      ></div>
      <div className="relative">{children}</div>
    </div>
  );
}
