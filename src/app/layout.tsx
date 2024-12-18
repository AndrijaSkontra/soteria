import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soteria",
  description: "Soteria web application",
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value;

  return (
    <html className={theme === "dark" ? "dark" : "light"}>
      <body className={`antialiased ${inter.className}`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
