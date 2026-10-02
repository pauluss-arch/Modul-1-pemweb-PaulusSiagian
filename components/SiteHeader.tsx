import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteHeaderProps {
  productName: string;
  navLinks: NavLink[];
}

export default function SiteHeader({ productName, navLinks }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:focus-visible:ring-teal-400"
          aria-label={`${productName} Home`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-teal-500">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {productName}
            </span>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              Healthcare Directory & Emergency Index
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-teal-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
