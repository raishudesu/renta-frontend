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
  vehicleBookingRecords: Booking[];
  vehicleImages: VehicleImage[];
}

export interface VehicleImage {
  id: string;
  imageLink: string;
  vehicleId: string;
}
