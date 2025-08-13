import VehiclesBrowser from "@/components/vehicle-browser";
import { getAllVehicles } from "@/data-access/vehicle";

export const metadata = {
  title: "Vehicles",
  description: "Browse available rental vehicles.",
};

export default async function Page() {
  const vehicles = await getAllVehicles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Browse Vehicles
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search, filter, and sort rental vehicles. Click a card for more
          details.
        </p>
      </div>
      <VehiclesBrowser vehicles={vehicles} />
    </main>
  );
}
