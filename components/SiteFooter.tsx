export interface SiteFooterProps {
  productName: string;
}

export default function SiteFooter({ productName }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-xs font-bold text-white dark:bg-teal-500">
              +
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {productName}
            </span>
          </div>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 sm:text-right">
            &copy; {currentYear} {productName}. Designed for rapid community health access. Emergency lines operate 24/7.
          </p>
        </div>
      </div>
    </footer>
  );
}
