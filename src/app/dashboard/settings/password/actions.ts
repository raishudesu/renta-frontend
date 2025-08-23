"use server";

import { updateUserPassword } from "@/data-access/user";
import { actionClient } from "@/lib/safe-action";
import { passwordUpdateSchema } from "@/schemas/user.schema";

export const changePasswordAction = actionClient
  .inputSchema(passwordUpdateSchema)
  .action(async ({ parsedInput }) => {
    const res = await updateUserPassword({
      userId: parsedInput.userId,
      newPassword: parsedInput.newPassword,
      currentPassword: parsedInput.currentPassword,
    });

    return res;
  });
