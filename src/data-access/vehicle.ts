import { authOptions } from "@/lib/auth";
import { vehicleCreationSchema } from "@/schemas/vehicle.schema";
import { Vehicle } from "@/types/vehicle.type";
import { getServerSession } from "next-auth";
import z from "zod";

export const getAllVehicles = async (): Promise<Vehicle[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    throw new Error("Unauthorized: No session or access token found");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle`, {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch vehicles");
  }

  return res.json();
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch vehicle with id ${id}`);
  }

  return res.json();
};

export const getVehiclesByUserId = async (
  userId: string
): Promise<Vehicle[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    throw new Error("Unauthorized: No session or access token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Vehicle/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch vehicles");
  }

  return res.json();
};

export const createVehicle = async (
  vehicleData: z.infer<typeof vehicleCreationSchema>
): Promise<Vehicle> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    throw new Error("Unauthorized: No session or access token found");
  }

  const formData = new FormData();

  // Separate the file
  const { vehicleImageFile, ...textFields } = vehicleData;

  // Append non-file fields automatically
  Object.entries(textFields).forEach(([key, value]) => {
    formData.append(key, String(value)); // ensure value is stringified
  });

  // Append the image file if it exists
  if (vehicleImageFile) {
    formData.append("vehicleImageFile", vehicleImageFile);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
      // no Content-Type — let browser set it
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create vehicle");
  }

  return res.json();
};

export const updateVehicle = async (
  id: string,
  vehicleData: Omit<Vehicle, "vehicleBookingRecords">
): Promise<Vehicle> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update vehicle with id ${id}`);
  }

  return res.json();
};

export const deleteVehicle = async (id: string): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete vehicle with id ${id}`);
  }

  return;
};
