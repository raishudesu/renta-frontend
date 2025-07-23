import z from "zod";

export const subscriptionSchema = z.object({
  id: z.string(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  userId: z.string(),
  paymentId: z.string().optional(),
  subscriptionTierId: z.number(),
  isVerified: z.boolean(),
});
