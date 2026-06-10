import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  title: "HiTekk — Premium Elektronik",
  description: "HiTekk säljer premium elektronik, hörlurar, laptops, mobiler och gadgets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
