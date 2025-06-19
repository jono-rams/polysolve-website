"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsSections } from "@/lib/docs-navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from "lucide-react";

// The navigation links component, which we'll use in both mobile and desktop.
function DocsSidebarNav() {
  const pathname = usePathname();
  
  return (
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
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    // On medium screens and up, use a 2-column grid. On mobile, it's a single column.
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
      
      {/* Desktop Sidebar: a fixed column, hidden on mobile */}
      <aside className="hidden md:block w-[240px]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] py-6 pr-6">
          <DocsSidebarNav />
        </div>
      </aside>

      {/* Main Content and Mobile Menu Button */}
      <div>
        {/* Mobile Menu Button: A sheet trigger, hidden on desktop */}
        <div className="md:hidden pb-4">
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