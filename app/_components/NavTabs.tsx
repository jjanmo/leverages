'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { NAV_ITEMS } from './nav-items';

const NavTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex self-stretch items-stretch">
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center px-3 text-sm border-b-2 transition-colors',
              isActive ? 'text-ink-1 font-medium border-ink-1' : 'text-ink-3 hover:text-ink-2 border-transparent'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavTabs;
