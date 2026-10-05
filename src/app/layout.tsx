import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { ShopProvider } from "@/lib/ShopContext";

export const metadata: Metadata = {
  title: "HiTekk — Premium elektronik",
  description: "HiTekk säljer premium elektronik, hörlurar, laptops, mobiler och gadgets. Fri frakt från 599 kr.",
};

export const viewport: Viewport = { themeColor: "#060a14" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <LangProvider>
          <ShopProvider>{children}</ShopProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
