import React from "react";

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="w-full py-8 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-4 dark:border-slate-800">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
