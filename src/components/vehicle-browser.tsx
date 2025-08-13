"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SortAsc, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import VehicleCard from "./vehicle-card";
import {
  getVehicleTypeLabel,
  vehicleTypeOptions,
  VehicleWithOwner,
} from "@/types/vehicle.type";
import VehiclePublicCard from "./vehicle-public-card";

// function useDebouncedValue<T>(value: T, delay = 300) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const id = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(id);
//   }, [value, delay]);
//   return debounced;
// }

const PAGE_SIZE = 12;

export default function VehiclesBrowser({
  vehicles,
}: {
  vehicles: VehicleWithOwner[];
}) {
  //   const [mappedvehicles, setVehicles] = useState<VehicleWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  //   const debouncedQuery = useDebouncedValue(query, 300);

  //   useEffect(() => {
  //     // Reset to first page when filters change
  //     setPage(1);
  //   }, [debouncedQuery, typeFilter, sort]);

  //   const filtered = useMemo(() => {
  //     const q = debouncedQuery.trim().toLowerCase();
  //     let list = vehicles;
  //     if (q) {
  //       list = list.filter((v) => {
  //         const ownerFull =
  //           `${v.ownerName.firstName} ${v.ownerName.lastName}`.toLowerCase();
  //         return (
  //           v.modelName.toLowerCase().includes(q) ||
  //           v.description.toLowerCase().includes(q) ||
  //           v.plateNumber.toLowerCase().includes(q) ||
  //           ownerFull.includes(q) ||
  //           getVehicleTypeLabel(v.type).toLowerCase().includes(q) ||
  //           v.color.toLowerCase().includes(q)
  //         );
  //       });
  //     }
  //     if (typeFilter !== "all") {
  //       const asNum = Number(typeFilter);
  //       list = list.filter((v) => v.type === asNum);
  //     }
  //     list = [...list].sort((a, b) => {
  //       if (sort === "newest")
  //         return b.createdAt.getTime() - a.createdAt.getTime();
  //       return a.createdAt.getTime() - b.createdAt.getTime();
  //     });
  //     return list;
  //   }, [vehicles, debouncedQuery, typeFilter, sort]);

  //   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  //   const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  //   const hasActiveFilters =
  //     debouncedQuery.length > 0 || typeFilter !== "all" || sort !== "newest";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              //   value={query}
              //   onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by model, plate, owner, type, or color"
              className="pl-9"
              aria-label="Search vehicles"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
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
        {/* {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("");
              setTypeFilter("all");
              setSort("newest");
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )} */}
      </div>

      <Separator />

      {/* {loading ? (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="status"
          aria-label="Loading vehicles"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-2">
              <Skeleton className="mb-3 h-40 w-full rounded-md" />
              <Skeleton className="mb-2 h-5 w-2/3" />
              <Skeleton className="mb-1 h-4 w-1/2" />
              <Skeleton className="mb-1 h-4 w-1/3" />
              <Skeleton className="mt-2 h-8 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-lg border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Failed to load vehicles: {error}
          </p>
          <Button className="mt-4" onClick={() => location.reload()}>
            Try again
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No vehicles match your search or filters.
          </p>
          <Button
            className="mt-4 bg-transparent"
            variant="outline"
            onClick={() => {
              setQuery("");
              setTypeFilter("all");
              setSort("newest");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-live="polite"
          >
            {paged.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
              vehicles
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )} */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-live="polite"
      >
        {vehicles.map((vehicle) => (
          <VehiclePublicCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
