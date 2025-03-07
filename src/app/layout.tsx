import "./globals.css";
import type { Metadata } from "next";
import { geistSans } from "./fonts/fonts";
import { siteConfig } from "./config/site";
import { Header } from "./(app)/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Header />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
