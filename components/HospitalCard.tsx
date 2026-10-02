import { Hospital, HospitalCategory } from "@/lib/types";

export interface HospitalCardProps {
  hospital: Hospital;
}

const CATEGORY_LABELS: Record<HospitalCategory, string> = {
  general: "General Hospital",
  maternity: "Maternity & Pediatric",
  emergency: "Emergency & Trauma Center",
  specialized: "Specialized Institute",
};

const CATEGORY_STYLES: Record<HospitalCategory, string> = {
  general:
    "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
  maternity:
    "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  emergency:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  specialized:
    "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
};

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const { name, category, address, isEmergency24h, contact } = hospital;

  return (
    <article
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
      aria-labelledby={`hospital-title-${hospital.id}`}
    >
      <div>
        {/* Top Badges: Category & 24h ER Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${CATEGORY_STYLES[category]}`}
          >
            {CATEGORY_LABELS[category]}
          </span>

          {isEmergency24h ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300"
              title="24/7 Emergency Services Available"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600 dark:bg-rose-400"></span>
              </span>
              24h Emergency
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
              Standard ER Hours
            </span>
          )}
        </div>

        {/* Hospital Name */}
        <h3
          id={`hospital-title-${hospital.id}`}
          className="text-lg font-bold leading-snug text-slate-900 dark:text-white"
        >
          {name}
        </h3>

        {/* Address */}
        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <address className="not-italic leading-relaxed">{address}</address>
        </div>
      </div>

      {/* Footer Details: Contact Information */}
      <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500 dark:text-slate-400">
            Emergency & Inquiries:
          </span>
          {contact ? (
            <a
              href={`tel:${contact.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 font-semibold text-teal-700 transition-colors hover:text-teal-800 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              aria-label={`Call ${name} at ${contact}`}
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{contact}</span>
            </a>
          ) : (
            <span className="italic text-slate-400 dark:text-slate-500">
              Direct line unlisted
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
