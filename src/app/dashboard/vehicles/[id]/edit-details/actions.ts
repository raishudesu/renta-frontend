"use server";

import { updateVehicle } from "@/data-access/vehicle";
import { actionClient } from "@/lib/safe-action";
import { vehicleUpdateSchema } from "@/schemas/vehicle.schema";
import { revalidatePath } from "next/cache";

export const updateVehicleAction = actionClient
  .inputSchema(vehicleUpdateSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...rest } = parsedInput;

    const res = await updateVehicle(id, rest);

    revalidatePath("/dashboard/vehicles");

    return res;
  });
