import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

const spaceGrotesk = Space_Mono({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Khizar Ahmed | Portfolio",
  description:
    "Portfolio of Khizar Ahmed: software engineering, automation, QA/security case studies, and production web builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
