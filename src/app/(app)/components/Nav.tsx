"use client";

import { usePathname } from "next/navigation";
import { Icons } from "./Icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { siteConfig } from "@/app/config/site";

interface NavProps {
  isAuthenticated: boolean;
}

export function MainNav({ isAuthenticated }: NavProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <NavLinks isAuthenticated={isAuthenticated} pathname={pathname} />
      </nav>
    </div>
  );
}

export function MobileNav({ isAuthenticated }: NavProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu size={20} strokeWidth={1.5} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <Link href="/" className="mb-6 flex items-center gap-2">
              <Icons.logo className="h-6 w-6" />
              <span className="inline-block font-bold lg:hidden">
                {siteConfig.name}
              </span>
            </Link>
          </SheetHeader>
          <nav className="flex flex-col items-start gap-2 text-sm">
            <NavLinks isAuthenticated={isAuthenticated} pathname={pathname} />
          </nav>
          <SheetFooter className="mt-12">
            <div className="flex items-center justify-between gap-4">
              <Button asChild variant="outline" className="w-1/2">
                <Link
                  href={siteConfig.links.x}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.x className="h-4 w-4 text-current" />
                  <span>Twitter</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-1/2">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NavLinks({
  isAuthenticated,
  pathname,
}: {
  isAuthenticated: boolean;
  pathname: string;
}) {
  return (
    <>
      <Link
        href="/"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/" ? "text-foreground" : "text-foreground/80"
        )}
      >
        Home
      </Link>
      {isAuthenticated && (
        <Link
          href="/links"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/links" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Links
        </Link>
      )}
    </>
  );
}

export function AuthNav({ isAuthenticated }: NavProps) {
  return (
    <nav className="flex items-center gap-4 text-sm xl:gap-6">
      {isAuthenticated ? (
        <UserButton />
      ) : (
        <Button asChild size="default" variant="outline">
          <SignUpButton mode="modal">Get Started</SignUpButton>
        </Button>
      )}
    </nav>
  );
}
