import { z } from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  bookerName: z.string(),
  bookerPhone: z.string(),
  bookerPhoneCountry: z.string(),
  userId: z.string(),
  vehicleId: z.string(),
  status: z.enum(["Pending", "Confirmed", "Cancelled"]),
});
