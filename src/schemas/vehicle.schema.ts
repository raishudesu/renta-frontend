import z from "zod";

export const vehicleCreationSchema = z.object({
  modelName: z.string(),
  type: z.number(), // 0 for car, 1 for motorcycle
  color: z.string(),
  description: z.string(),
  ownerId: z.string(),
});
