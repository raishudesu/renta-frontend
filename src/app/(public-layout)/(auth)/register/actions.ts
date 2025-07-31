"use server";

import { registerUser } from "@/data-access/user";
import { actionClient } from "@/lib/safe-action";
import { userRegistrationSchema } from "@/schemas/user.schema";

export const registerUserAction = actionClient
  .inputSchema(userRegistrationSchema)
  .action(async ({ parsedInput }) => {
    const res = await registerUser(parsedInput);

    return res;
  });
