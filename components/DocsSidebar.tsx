"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsSections } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-full shrink-0 md:w-64">
      <div className="h-full py-6 pr-6 lg:py-8">
        <nav className="flex flex-col gap-1">
          {docsSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === section.href && "bg-muted hover:bg-muted"
                )}
              >
                {section.title}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}