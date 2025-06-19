"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Code, Github, Menu, Package } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Group 1: Logo */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold text-lg">PolySolve</span>
          </Link>

          {/* Desktop Navigation: Hidden on mobile, visible on medium screens and up */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            <Link href="/docs" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Docs
            </Link>
            <Link href="/demo" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Demo
            </Link>
          </nav>
        </div>

        {/* Group 2: Icons and Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Social Icons are always visible */}
          <a href="https://github.com/jono-rams/polysolve" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://pypi.org/project/polysolve/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Package className="h-5 w-5" />
            </Button>
          </a>

          {/* Mobile Menu Trigger: Visible on mobile, hidden on medium screens and up */}
          <div className='md:hidden'>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <div className="mt-8 flex flex-col space-y-4">
                  <Link
                    href="/docs"
                    className="text-lg font-medium text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Docs
                  </Link>
                  <Link
                    href="/demo"
                    className="text-lg font-medium text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Demo
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;