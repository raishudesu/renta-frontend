import { subscriptionSchema } from "@/schemas/subscription.schema";
import z from "zod";

export type Subscription = z.infer<typeof subscriptionSchema>;
