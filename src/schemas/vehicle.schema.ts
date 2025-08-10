import z from "zod";

export const vehicleCreationSchema = z.object({
  modelName: z
    .string()
    .min(1, "Model name is required")
    .max(100, "Model name cannot exceed 100 characters"),
  type: z.string(), // 0 for car, 1 for motorcycle
  color: z
    .string()
    .min(1, "Color is required")
    .max(50, "Color cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  ownerId: z.string(),
  plateNumber: z
    .string()
    .min(1, "Plate number is required")
    .max(20, "Plate number cannot exceed 20 characters"),
  vehicleImageFile: z.file().optional(),
});

export const vehicleDeletionSchema = z.object({
  id: z.string(),
});
