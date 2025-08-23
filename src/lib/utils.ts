import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: Date) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  } catch {
    return "";
  }
}

export const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObj);
};

export const formatTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return "Invalid time";
  }

  return new Intl.DateTimeFormat("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObj);
};

export const createQueryString = (
  params: Record<string, string | number | null>,
  searchParams: ReadonlyURLSearchParams
) => {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([name, value]) => {
    if (value === null || value === "") {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, String(value));
    }
  });

  return newSearchParams.toString();
};

// 🔹 Generate page numbers with ellipses
export const getPageNumbers = (current: number, total: number) => {
  const delta = 2; // how many pages around current
  const pages: (number | "...")[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    pages.push(i);
  }

  if (current - delta > 2) {
    pages.unshift("...");
  }
  if (current + delta < total - 1) {
    pages.push("...");
  }

  pages.unshift(1);
  if (total > 1) pages.push(total);

  return pages;
};
