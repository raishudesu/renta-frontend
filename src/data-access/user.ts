import { userLoginSchema } from "@/schemas/user.schema";
import { UserLoginResponse } from "@/types/user.type";
import z from "zod";

export const loginUser = async (
  userData: z.infer<typeof userLoginSchema>
): Promise<UserLoginResponse> => {
  console.log(userData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  const data: UserLoginResponse = await res.json();

  return data;
};
