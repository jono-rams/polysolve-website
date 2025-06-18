// components/Header.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, Github, Package } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        
        {/* Group 1: Logo and Navigation Links */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold text-lg">PolySolve</span>
          </Link>
          <nav className="flex items-center space-x-8 text-base font-medium">
            <Link href="/docs" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Docs
            </Link>
            <Link href="/demo" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Demo
            </Link>
          </nav>
        </div>

        {/* Group 2: Icons on the right */}
        <div className="flex items-center space-x-4">
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
        </div>

      </div>
    </header>
  );
};

export default Header;