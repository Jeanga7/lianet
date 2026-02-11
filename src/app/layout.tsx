import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono, Lato, Varela_Round } from "next/font/google";
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
      <head>
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js"
          type="module"
        />
      </head>
      <body
        className={`${varelaRound.variable} ${lato.variable} ${geistMono.variable} antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
