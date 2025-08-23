import { bookingSchema } from "@/schemas/booking.schema";
import z from "zod";

export type Booking = z.infer<typeof bookingSchema>;

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export type VehicleDetails = {
  modelName: string;
  color: string;
  description: string;
};

export type BookingWithVehicle = Booking & {
  vehicleDetails: VehicleDetails;
};
