import z from "zod";

export const paymentSchema = z.object({
  id: z.string(),
  mediumTypeId: z.string(),
  providerName: z.string().optional(),
  amount: z.string(),
  receiptImageLink: z.string().optional(),
  transactionId: z.string(),
});
