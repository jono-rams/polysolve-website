"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsSections } from "@/lib/docs-navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsPagination() {
  const pathname = usePathname();
  const currentIndex = docsSections.findIndex((section) => section.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const prevSection = docsSections[currentIndex - 1];
  const nextSection = docsSections[currentIndex + 1];

  return (
    <div className="mt-12 flex items-center justify-between">
      <div>
        {prevSection && (
          <Link href={prevSection.href}>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {prevSection.title}
            </Button>
          </Link>
        )}
      </div>
      <div>
        {nextSection && (
          <Link href={nextSection.href}>
            <Button variant="outline">
              {nextSection.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}