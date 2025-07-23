import { bookingSchema } from "@/schemas/booking.schema";
import z from "zod";

export type Booking = z.infer<typeof bookingSchema>;
