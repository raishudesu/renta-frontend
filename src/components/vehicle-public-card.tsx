"use client";

import { Palette, User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getVehicleTypeMeta, VehicleWithOwner } from "@/types/vehicle.type";
import VehiclePublicCardDrawer from "./vehicle-card-drawer";

const defaultVehicle: VehicleWithOwner = {
  id: "v_default",
  modelName: "Sample Sedan",
  type: 1,
  color: "Gray",
  plateNumber: "ABC-1234",
  description: "A sample vehicle card. Replace with real data.",
  ownerId: "owner_default",
  createdAt: new Date(),
  imagePreSignedUrl: null,
  vehicleBookingRecords: [],
  ownerName: { firstName: "Casey", lastName: "Morgan" },
};

export function initials(first: string, last: string) {
  return `${(first?.[0] ?? "").toUpperCase()}${(
    last?.[0] ?? ""
  ).toUpperCase()}`;
}

export default function VehiclePublicCard({
  vehicle = defaultVehicle,
}: {
  vehicle?: VehicleWithOwner;
}) {
  //   const { toast } = useToast();
  const meta = getVehicleTypeMeta(vehicle.type);

  const ownerFull = `${vehicle.ownerName.firstName} ${vehicle.ownerName.lastName}`;

  const imageSrc =
    vehicle.imagePreSignedUrl ||
    `/placeholder.svg?height=200&width=400&query=rental%20vehicle%20${encodeURIComponent(
      vehicle.modelName || "car"
    )}`;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`${vehicle.modelName} in ${vehicle.color}`}
          className="h-40 w-full rounded-t-lg object-cover"
          loading="lazy"
          fill
        />
        <div className="pointer-events-none absolute left-2 top-2 flex gap-2">
          <Badge
            className={cn(
              "shadow",
              meta.className // type-colored badge
            )}
          >
            {meta.label}
          </Badge>
          <Badge variant="secondary" className="shadow">
            {vehicle.color}
          </Badge>
        </div>
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="flex items-start justify-between gap-3 text-base md:text-lg">
          <span className="line-clamp-1">{vehicle.modelName}</span>
        </CardTitle>
        {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>Added {vehicle.createdAt.toLocaleDateString()}</span>
        </div> */}
      </CardHeader>

      <CardContent className="grid gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1">{vehicle.color}</span>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="line-clamp-3">{vehicle.description}</p>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-sm">
              <User2 className="h-4 w-4 text-muted-foreground" />
              <span className="line-clamp-1">{ownerFull}</span>
            </div>
          </div>
        </div>
        <VehiclePublicCardDrawer vehicle={vehicle} />
      </CardFooter>
    </Card>
  );
}
