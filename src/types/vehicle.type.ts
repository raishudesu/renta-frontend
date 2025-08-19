import { Booking } from "./booking.type";

export interface Vehicle {
  id: string;
  modelName: string;
  type: number;
  color: string;
  plateNumber: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  imagePreSignedUrl?: string | null;
  vehicleBookingRecords: Booking[];
}

export interface VehicleWithOwner extends Vehicle {
  ownerName: {
    firstName: string;
    lastName: string;
  };
  businessCoordinates?: string | null;
}

export interface VehicleImage {
  id: string;
  imageLink: string;
  vehicleId: string;
}

export function getVehicleTypeLabel(type: number) {
  return VEHICLE_TYPES[type]?.label ?? "Other";
}

// Vehicle types mapping. Adjust labels to match your domain.
export const VEHICLE_TYPES: Record<
  number,
  { label: string; className: string }
> = {
  0: { label: "Car", className: "bg-emerald-100 text-emerald-800" },
  1: { label: "Motor", className: "bg-amber-100 text-amber-800" },
};

export function getVehicleTypeMeta(type: number) {
  return (
    VEHICLE_TYPES[type] ?? {
      label: "Other",
      className: "bg-slate-100 text-slate-800",
    }
  );
}

export const vehicleTypeOptions = Object.entries(VEHICLE_TYPES).map(
  ([value, meta]) => ({
    value: Number(value),
    label: meta.label,
  })
);
