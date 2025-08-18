import { authOptions } from "@/lib/auth";
import { userLoginSchema, userRegistrationSchema } from "@/schemas/user.schema";
import { User, UserLoginResponse } from "@/types/user.type";
import { getServerSession } from "next-auth";
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
    const errorText = await res.text();
    throw new Error(errorText || "Authentication failed");
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
    const errorText = await res.text();
    throw new Error(errorText || "Registration failed");
  }

  // No need to parse response body since API returns no content
  return;
};

export const getAllUsers = async (): Promise<User[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    throw new Error("Unauthorized: No session or access token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch users");
  }

  const data: User[] = await res.json();
  return data;
};

export const updateBusinessCoordinates = async (
  businessCoordinatesString: string
): Promise<{ ok: boolean }> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    throw new Error("Unauthorized: No session or access token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/User/${session.user.id}/update-business-coordinates`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({ businessCoordinates: businessCoordinatesString }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(errorText || "Failed to fetch users");
  }

  return { ok: true };
};
