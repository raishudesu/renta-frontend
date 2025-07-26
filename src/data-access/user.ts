import { userLoginSchema, userRegistrationSchema } from "@/schemas/user.schema";
import { UserLoginResponse } from "@/types/user.type";
import z from "zod";

export const loginUser = async (
  userData: z.infer<typeof userLoginSchema>
): Promise<UserLoginResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  const data: UserLoginResponse = await res.json();

  return data;
};

export const registerUser = async (
  userData: z.infer<typeof userRegistrationSchema>
): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  // No need to parse response body since API returns no content
  return;
};
