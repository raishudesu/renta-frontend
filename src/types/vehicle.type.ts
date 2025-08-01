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

export interface VehicleImage {
  id: string;
  imageLink: string;
  vehicleId: string;
}
