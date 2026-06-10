import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiTekk — Premium Elektronik",
  description: "HiTekk säljer premium elektronik, hörlurar, laptops, mobiler och gadgets. Fri frakt, 30 dagars retur och säker betalning.",
  keywords: ["elektronik", "hörlurar", "laptops", "mobiler", "gadgets", "premium"],
  openGraph: {
    title: "HiTekk — Premium Elektronik",
    description: "Premium elektronik med fri frakt och bästa pris.",
    siteName: "HiTekk",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
