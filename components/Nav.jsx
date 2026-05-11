'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/speakers', label: 'Speakers' },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="border-b border-neutral-600 bg-neutral-900">
      <div className="flex items-center justify-between py-[var(--spacing-200)] px-[var(--page-padding)]">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-[16px] text-green-200 tracking-[0.5px] hover:opacity-80 transition-opacity"
          aria-label="DevHorizon 26 — home"
        >
          DEVHORIZON_26
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden sm:flex items-center gap-[var(--spacing-100)]">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`nav-link ${active ? 'nav-link--active' : ''}`}
              >
                {label}
              </Link>
            );
          })}

          {/* Auth button */}
          {session ? (
            <div className="flex items-center gap-[var(--spacing-150)] ml-[var(--spacing-200)]">
              <span className="font-mono text-[12px] text-neutral-500 uppercase tracking-[0.5px]">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="nav-link"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="nav-link ml-[var(--spacing-200)]"
              style={{ borderColor: 'var(--color-green-200)', color: 'var(--color-green-200)' }}
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden border border-neutral-600 p-[var(--spacing-100)] text-neutral-100 hover:border-green-200 transition-colors"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile navigation">
          <ul className="list-none m-0 p-0 border-t border-neutral-600">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-mono font-bold text-[12px] uppercase tracking-[0.5px] px-[var(--spacing-300)] py-[var(--spacing-200)] border-b border-neutral-600 transition-colors ${
                      active ? 'text-green-200' : 'text-neutral-200 hover:text-green-200'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full text-left font-mono font-bold text-[12px] uppercase tracking-[0.5px] px-[var(--spacing-300)] py-[var(--spacing-200)] text-neutral-200 hover:text-green-200 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn('github')}
                  className="w-full text-left font-mono font-bold text-[12px] uppercase tracking-[0.5px] px-[var(--spacing-300)] py-[var(--spacing-200)] text-green-200"
                >
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}