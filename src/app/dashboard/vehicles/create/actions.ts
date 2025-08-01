"use server";

import { createVehicle } from "@/data-access/vehicle";
import { actionClient } from "@/lib/safe-action";
import { vehicleCreationSchema } from "@/schemas/vehicle.schema";

export const createVehicleAction = actionClient
  .inputSchema(vehicleCreationSchema)
  .action(async ({ parsedInput }) => {
    const res = await createVehicle(parsedInput);

    return res;
  });
