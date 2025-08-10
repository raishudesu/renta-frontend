import { Vehicle } from "@/types/vehicle.type";
import Image from "next/image";
import { CarFront } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { VehicleDeletionAlertDialog } from "./vehicle-deletion-alert-dialog";

const defaultTypeLabels: Record<number, string> = {
  0: "Car",
  1: "Motorcycle",
};

function getTypeLabel(type: number, customMap?: Record<number, string>) {
  if (customMap && typeof customMap[type] === "string") return customMap[type];
  if (typeof defaultTypeLabels[type] === "string")
    return defaultTypeLabels[type];
  return "Other";
}
type VehicleCardProps = {
  vehicle: Vehicle;
  className?: string;
  typeLabels?: Record<number, string>;
};

const VehicleCard = (props: VehicleCardProps) => {
  const { vehicle, className, typeLabels } = props;
  const typeLabel = getTypeLabel(vehicle.type, typeLabels);
  const hasImage = Boolean(vehicle.imagePreSignedUrl);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[16/9]">
          <Image
            src={
              hasImage
                ? (vehicle.imagePreSignedUrl as string)
                : "/placeholder.svg?height=320&width=480&query=vehicle%20photo%20placeholder"
            }
            alt={"Photo of " + vehicle.modelName}
            fill
            // sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
            priority={false}
          />
        </div>

        <div className="flex flex-col w-full">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CarFront className="h-3.5 w-3.5" aria-hidden="true" />
                {typeLabel}
              </Badge>

              <div
                className="ml-2 flex items-center gap-2"
                aria-label={"Color " + vehicle.color}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border"
                  style={{ backgroundColor: vehicle.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {vehicle.color}
                </span>
              </div>

              <div className="ml-auto text-xs text-muted-foreground">
                {"Added " + formatDate(vehicle.createdAt)}
              </div>
            </div>

            <CardTitle className="text-xl md:text-2xl">
              {vehicle.modelName}
            </CardTitle>
            <CardDescription className="font-mono">
              {"Plate: "}{" "}
              <span className="uppercase tracking-wide">
                {vehicle.plateNumber}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {vehicle.description}
            </p>
          </CardContent>

          <CardFooter className="mt-4 text-xs text-muted-foreground">
            <VehicleDeletionAlertDialog vehicleId={vehicle.id} />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
