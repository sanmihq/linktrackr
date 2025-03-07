"use client";

import Link from "next/link";
import { Icons } from "./Icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { AuthNav, MainNav, MobileNav } from "./Nav";
import { siteConfig } from "@/app/config/site";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  const { user } = useUser();
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center px-4">
        <MainNav isAuthenticated={isAuthenticated} />
        <MobileNav isAuthenticated={isAuthenticated} />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-0.5">
            <div className="hidden items-center md:flex">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href={siteConfig.links.x}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.x className="h-4 w-4 text-current" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
            <ThemeSwitcher />
          </nav>
          <AuthNav isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}
