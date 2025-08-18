"use server";

import { updateBusinessCoordinates } from "@/data-access/user";
import { actionClient } from "@/lib/safe-action";
import { businessCoordinatesSchema } from "@/schemas/user.schema";
import { revalidatePath } from "next/cache";

export const updateBusinessCoordinatesAction = actionClient
  .inputSchema(businessCoordinatesSchema)
  .action(async ({ parsedInput }) => {
    const res = await updateBusinessCoordinates(
      parsedInput.businessCoordinatesString
    );

    revalidatePath("/dashboard/settings");

    return res;
  });
