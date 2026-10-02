"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Hospital, HospitalCategory } from "@/lib/types";
import HospitalCard from "./HospitalCard";

const CATEGORIES: { label: string; value: "all" | HospitalCategory }[] = [
  { label: "All Facilities", value: "all" },
  { label: "General", value: "general" },
  { label: "Maternity", value: "maternity" },
  { label: "Emergency", value: "emergency" },
  { label: "Specialized", value: "specialized" },
];

export default function HospitalList() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<"all" | HospitalCategory>("all");

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/data/hospitals.json");

      if (!res.ok) {
        throw new Error(
          `Unable to retrieve hospital directory (Status ${res.status}: ${res.statusText || "Server error"})`
        );
      }

      const data: Hospital[] = await res.json();
      setHospitals(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading healthcare facilities.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    async function loadHospitals() {
      try {
        const res = await fetch("/data/hospitals.json");

        if (!res.ok) {
          throw new Error(
            `Unable to retrieve hospital directory (Status ${res.status}: ${res.statusText || "Server error"})`
          );
        }

        const data: Hospital[] = await res.json();
        if (!isCancelled) {
          setHospitals(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while loading healthcare facilities.";
          setError(message);
          setLoading(false);
        }
      }
    }

    loadHospitals();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Filtered hospital catalog
  const filteredHospitals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return hospitals.filter((hospital) => {
      // Category match
      const matchesCategory = filter === "all" || hospital.category === filter;

      // Search match by name or address
      const matchesSearch =
        query === "" ||
        hospital.name.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [hospitals, searchQuery, filter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Filter Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Keyword Search Input */}
          <div className="relative w-full">
            <label
              htmlFor="hospital-search"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Search Directory
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg
                  className="h-5 w-5 text-slate-400 dark:text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="hospital-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hospital name, medical center, or address..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pr-10 pl-11 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:bg-slate-900 dark:focus:ring-teal-400/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search input"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div>
            <span
              id="category-filter-label"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Filter by Category
            </span>
            <div
              role="group"
              aria-labelledby="category-filter-label"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((cat) => {
                const isActive = filter === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFilter(cat.value)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:focus-visible:ring-teal-400 ${
                      isActive
                        ? "bg-teal-700 text-white shadow-sm dark:bg-teal-600 dark:text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Bar & Match Count (aria-live="polite") */}
      <div className="flex flex-col items-start justify-between gap-2 px-1 sm:flex-row sm:items-center">
        <p
          aria-live="polite"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {loading ? (
            <span>Checking hospital records...</span>
          ) : error ? (
            <span className="text-rose-600 dark:text-rose-400">Error retrieving catalog</span>
          ) : (
            <span>
              Showing <strong className="font-semibold text-slate-900 dark:text-white">{filteredHospitals.length}</strong>{" "}
              {filteredHospitals.length === 1 ? "hospital" : "hospitals"}
              {filter !== "all" && (
                <span> in <span className="capitalize">{filter}</span> category</span>
              )}
              {searchQuery.trim() !== "" && (
                <span> matching &ldquo;{searchQuery.trim()}&rdquo;</span>
              )}
            </span>
          )}
        </p>

        {(searchQuery.trim() !== "" || filter !== "all") && !loading && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Main Content: Conditional Rendering */}
      {/* 1. Loading State */}
      {loading && (
        <div
          role="status"
          aria-label="Loading hospital directory"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3, 4, 5, 6].map((placeholderId) => (
            <div
              key={placeholderId}
              className="flex animate-pulse flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="mt-6 border-t border-slate-100 pt-3 dark:border-slate-800">
                <div className="flex justify-between">
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
          <span className="sr-only">Loading hospital records...</span>
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-300">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-rose-900 dark:text-rose-100">
                Failed to Load Hospital Catalog
              </h3>
              <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">
                {error}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 dark:bg-rose-700 dark:hover:bg-rose-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retry Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Empty State */}
      {!loading && !error && filteredHospitals.length === 0 && (
        <div
          role="status"
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
            No Hospitals Found
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-slate-600 dark:text-slate-400">
            No healthcare facilities match your current search query or category filter.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* 4. List Rendering (3 Breakpoints: Mobile, Tablet, Desktop) */}
      {!loading && !error && filteredHospitals.length > 0 && (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Hospital Directory Results"
        >
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  );
}

