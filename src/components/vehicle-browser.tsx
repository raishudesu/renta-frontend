"use client";

import { useEffect, useState } from "react";
import { Search, SortAsc } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import VehiclePublicCard from "./vehicle-public-card";
import { vehicleTypeOptions, VehicleWithOwner } from "@/types/vehicle.type";
import { PaginationMetadata } from "@/types/pagination";

// 🔹 Simple debounce hook
function useDebouncedValue<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// 🔹 Generate page numbers with ellipses
function getPageNumbers(current: number, total: number) {
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
}

export default function VehiclesBrowser({
  vehicles,
  pagination,
}: {
  vehicles: VehicleWithOwner[];
  pagination: PaginationMetadata;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("ModelName") || "");
  const [typeFilter, setTypeFilter] = useState<string>(
    searchParams.get("type") || "all"
  );
  const [sort, setSort] = useState<"newest" | "oldest">(
    (searchParams.get("sort") as "newest" | "oldest") || "newest"
  );
  const page =
    Number(searchParams.get("pageNumber")) || pagination.CurrentPage || 1;

  const debouncedQuery = useDebouncedValue(query, 500);

  const createQueryString = (
    params: Record<string, string | number | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([name, value]) => {
      if (value === null) {
        newSearchParams.delete(name);
      } else {
        newSearchParams.set(name, String(value));
      }
    });

    return newSearchParams.toString();
  };

  const goToPage = (pageNumber: number) => {
    router.push(
      `${pathname}?${createQueryString({
        pageNumber,
        modelName: debouncedQuery || null,
        type: typeFilter !== "all" ? typeFilter : null,
        sort,
      })}`
    );
  };

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        pageNumber: 1,
        modelName: debouncedQuery || null,
        type: typeFilter !== "all" ? typeFilter : null,
        sort,
      })}`
    );
  }, [debouncedQuery, typeFilter, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  const pageNumbers = getPageNumbers(
    pagination.CurrentPage,
    pagination.TotalPages
  );

  return (
    <div className="space-y-6">
      {/* 🔹 Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by model name"
              className="pl-9"
              aria-label="Search vehicles"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={typeFilter}
              onValueChange={(val) => setTypeFilter(val)}
            >
              <SelectTrigger className="w-[160px]" aria-label="Vehicle type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {vehicleTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(v) => setSort(v as "newest" | "oldest")}
            >
              <SelectTrigger className="w-[160px]" aria-label="Sort by">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  <SelectValue placeholder="Sort" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* 🔹 Vehicle grid */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-live="polite"
      >
        {vehicles.map((vehicle) => (
          <VehiclePublicCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {/* 🔹 Pagination footer */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {(page - 1) * pagination.PageSize + 1}-
          {Math.min(page * pagination.PageSize, pagination.TotalCount)} of{" "}
          {pagination.TotalCount} vehicles
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.HasPrevious}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </Button>

          {pageNumbers.map((p, idx) =>
            p === "..." ? (
              <span key={idx} className="px-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(p as number)}
              >
                {p}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.HasNext}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
