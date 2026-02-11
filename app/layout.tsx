import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
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

export const viewport: Viewport = {
  themeColor: "#d8c8ae",
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
