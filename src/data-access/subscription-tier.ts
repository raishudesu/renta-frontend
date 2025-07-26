import { SubscriptionTier } from "@/types/subscription-tier.type";

export const getSubscriptionTiers = async (): Promise<SubscriptionTier[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/SubscriptionTier`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch subscription tiers");
  }

  return res.json();
};

export const getSubscriptionTierById = async (
  id: string
): Promise<SubscriptionTier> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/SubscriptionTier/${id}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch subscription tier with id ${id}`);
  }

  return res.json();
};

export const createSubscriptionTier = async (
  subscriptionTierData: Omit<SubscriptionTier, "id">
): Promise<SubscriptionTier> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/SubscriptionTier`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionTierData),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create subscription tier");
  }

  return res.json();
};
