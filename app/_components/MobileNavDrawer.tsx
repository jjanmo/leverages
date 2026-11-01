'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { Logo } from '@/shared/ui';
import { NAV_ITEMS } from './nav-items';

const SM_BREAKPOINT_QUERY = '(min-width: 640px)';

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const MobileNavDrawer = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    // 데스크톱 너비로 넓어지면 드로어를 닫아 스크롤 잠금이 남지 않도록 한다
    const mediaQuery = window.matchMedia(SM_BREAKPOINT_QUERY);

    document.addEventListener('keydown', handleKeyDown);
    mediaQuery.addEventListener('change', close);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      mediaQuery.removeEventListener('change', close);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        aria-expanded={open}
        className="sm:hidden -ml-1.5 w-8 h-8 flex items-center justify-center rounded-lg text-ink-3 hover:text-ink-1 hover:bg-inset transition-colors cursor-pointer"
      >
        <MenuIcon />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="absolute inset-0 bg-black/40 animate-drawer-fade-in" onClick={() => setOpen(false)} />

            <aside className="absolute inset-y-0 left-0 w-72 max-w-[80vw] bg-card border-r border-edge shadow-2xl animate-drawer-slide-in flex flex-col">
              <div className="h-12 px-4 flex items-center justify-between border-b border-edge">
                <Link href="/" onClick={() => setOpen(false)} className="flex">
                  <Logo size="sm" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="메뉴 닫기"
                  className="-mr-1.5 w-8 h-8 flex items-center justify-center rounded-lg text-ink-3 hover:text-ink-1 hover:bg-inset transition-colors cursor-pointer"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="p-2 space-y-1">
                {NAV_ITEMS.map(({ label, href, Icon }) => {
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-colors',
                        isActive ? 'bg-inset text-ink-1 font-semibold' : 'text-ink-3 hover:bg-inset hover:text-ink-1'
                      )}
                    >
                      <span className="w-6 flex justify-center items-center">
                        <Icon />
                      </span>
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileNavDrawer;
