import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/layout/Cursor";
import LenisProvider from "@/components/layout/LenisProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Mohammed Haneen P M — Creative Developer & Data Analyst",
  description: "I combine creativity, development and analytics to build premium digital experiences.",
  openGraph: {
    title: "Mohammed Haneen P M",
    description: "Creative Developer & Data Analyst building premium digital experiences.",
    url: "https://haneen.dev",
    siteName: "Mohammed Haneen P M",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Haneen P M",
    description: "Creative Developer & Data Analyst building premium digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <LoadingScreen />
          <div id="global-cursor"></div>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
