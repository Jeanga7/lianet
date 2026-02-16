import type { Metadata } from "next";
import { Geist_Mono, Lato, Nunito, Varela_Round } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/layout";

const varelaRound = Varela_Round({
  variable: "--font-varela",
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lianet",
    template: "%s | Lianet",
  },
  description:
    "Lianet connecte les entreprises africaines avec des talents digitaux d'élite pour concevoir des solutions impactantes et évolutives.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head />
      <body
        className={`${varelaRound.variable} ${lato.variable} ${nunito.variable} ${geistMono.variable} antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
