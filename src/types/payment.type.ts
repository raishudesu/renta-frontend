import { paymentSchema } from "@/schemas/payment.schema";
import z from "zod";

export type Payment = z.infer<typeof paymentSchema>;
