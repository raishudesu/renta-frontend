import { vehicleCreationSchema } from "@/schemas/vehicle.schema";
import { Vehicle } from "@/types/vehicle.type";
import z from "zod";

export const getAllVehicles = async (): Promise<Vehicle[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle`);

  if (!res.ok) {
    throw new Error("Failed to fetch vehicles");
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Vehicle/user/${userId}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch vehicles for user with id ${userId}`);
  }

  return res.json();
};

export const createVehicle = async (
  vehicleData: z.infer<typeof vehicleCreationSchema>
): Promise<Vehicle> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vehicle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  });

  if (!res.ok) {
    throw new Error("Failed to create vehicle");
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
