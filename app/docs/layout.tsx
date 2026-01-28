"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsSections } from "@/lib/docs-navigation";
import {
  buildDocsHref,
  DOC_VERSIONS,
  DEFAULT_DOCS_VERSION,
  isDocsVersion,
  parseDocsPathname,
} from "@/lib/docs-versions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from "lucide-react";

function DocsVersionSelect() {
  const pathname = usePathname();
  const router = useRouter();

  const { version: currentVersion, slug: currentSlug } = parseDocsPathname(pathname);

  const onChangeVersion = (nextVersion: string) => {
    // Keep the current doc section when switching versions.
    const safeNextVersion = isDocsVersion(nextVersion)
      ? nextVersion
      : DEFAULT_DOCS_VERSION;
    router.push(buildDocsHref(safeNextVersion, currentSlug ?? "introduction"));
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="docs-version" className="sr-only">
        Documentation version
      </label>
      <select
        id="docs-version"
        value={currentVersion}
        onChange={(e) => onChangeVersion(e.target.value)}
        className={cn(
          "bg-background text-foreground",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        )}
      >
        {DOC_VERSIONS.map((v) => (
          <option key={v} value={v} className="bg-background text-foreground">
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

// The navigation links component, which we'll use in both mobile and desktop.
function DocsSidebarNav() {
  const pathname = usePathname();
  const { version, slug: currentSlug } = parseDocsPathname(pathname);
  
  return (
    <nav className="flex flex-col gap-1">
      {docsSections.map((section) => (
        <Link key={section.slug} href={buildDocsHref(version, section.slug)}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              currentSlug === section.slug && "bg-muted hover:bg-muted"
            )}
          >
            {section.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  return (
    // On medium screens and up, use a 2-column grid. On mobile, it's a single column.
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
      
      {/* Desktop Sidebar: a fixed column, hidden on mobile */}
      <aside className="hidden md:block w-[240px]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] py-6 pr-6">
          <div className="pb-4">
            <DocsVersionSelect />
          </div>
          <DocsSidebarNav />
        </div>
      </aside>

      {/* Main Content and Mobile Menu Button */}
      <div>
        {/* Mobile Menu Button: A sheet trigger, hidden on desktop */}
        <div className="md:hidden pb-4">
          <div className="pb-3">
            <DocsVersionSelect />
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="mr-2 h-4 w-4" />
                Docs Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader className="sr-only">
                  <SheetTitle>Documentation Menu</SheetTitle>
                </SheetHeader>
              <div className="pt-8">
                <DocsSidebarNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* The actual page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
