import { cookies } from "next/headers";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value;

  return (
    <html className={theme === "dark" ? "dark" : "light"}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
