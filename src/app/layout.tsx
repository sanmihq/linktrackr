import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "./fonts/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "LinkTrackr - Smart Link Logging",
  description:
    "Generate trackable links to log visitor data before redirecting to the original URL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
