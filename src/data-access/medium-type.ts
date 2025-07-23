import { MediumType } from "@/types/medium-type.type";

export const getMediumTypes = async (): Promise<MediumType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MediumType`);

  if (!response.ok) {
    throw new Error("Failed to fetch medium types");
  }

  return response.json();
};
