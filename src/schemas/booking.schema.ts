import { z } from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  bookerName: z.string(),
  bookerPhone: z.string(),
  // bookerPhoneCountry: z.string(),
  userId: z.string(),
  vehicleId: z.string(),
  status: z.number(),
});

export const bookingCreationSchema = z.object({
  startTime: z.date({ error: "Please provide a booking start date" }),
  endTime: z.date({ error: "Please provide a booking end date" }),
  bookerName: z.string({ error: "Please provide your name" }),
  bookerEmail: z.email(),
  bookerPhone: z.string().min(10).max(20),
  // bookerPhoneCountry: z.string("Please provide a contact number"),
  userId: z.string("User id is required"),
  vehicleId: z.string("Vehicle id is required"),
});

export type BookingCreation = z.infer<typeof bookingCreationSchema>;
