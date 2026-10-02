import Section from "@/components/Section";
import HospitalList from "@/components/HospitalList";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Overview */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Hospital Data &amp; Healthcare Catalog Directory
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              Browse accredited medical institutions, maternity pavilions, specialized clinics,
              and 24/7 emergency trauma centers. Filter by specialty or search by address to locate
              immediate clinical support.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Section containing the Client Component */}
      <Section id="directory" title="Healthcare Facilities Catalog">
        <HospitalList />
      </Section>

      {/* Emergency Guidance Section */}
      <Section id="emergency" title="Emergency 24/7 &amp; Urgent Care Guidelines">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-6 dark:border-rose-900/50 dark:bg-rose-950/20">
            <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100">
              When to Visit a 24-Hour Emergency Center
            </h3>
            <p className="mt-2 text-sm text-rose-950 dark:text-rose-200">
              Emergency centers equipped with 24h trauma teams are designated for life-threatening
              conditions including acute chest distress, severe trauma, sudden loss of consciousness,
              or uncontrolled hemorrhage.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-rose-800 dark:text-rose-300">
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>National Emergency Hotline: 911 / 112 / 119</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Routine &amp; Maternity Admissions
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              For scheduled procedures, outpatient maternal consultations, or non-acute pediatric care,
              we recommend dialing the direct facility contact line in advance to verify specialist
              rosters and ward availability.
            </p>
          </div>
        </div>
      </Section>

      {/* Directory Overview Section */}
      <Section id="about" title="Directory Standards &amp; Verification">
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            CareFinder catalogs verified medical centers across multiple administrative regions.
            All registered facilities undergo recurring operational audits to ensure emergency
            readiness, licensing validity, and accurate contact listings.
          </p>
        </div>
      </Section>
    </div>
  );
}

