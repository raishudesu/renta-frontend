"use server";

import { deleteVehicle } from "@/data-access/vehicle";
import { actionClient } from "@/lib/safe-action";
import { vehicleDeletionSchema } from "@/schemas/vehicle.schema";
import { revalidatePath } from "next/cache";

export const deleteVehicleAction = actionClient
  .inputSchema(vehicleDeletionSchema)
  .action(async ({ parsedInput }) => {
    const res = await deleteVehicle(parsedInput.id);

    revalidatePath("/dashboard/vehicles");

    return res;
  });
