import { Subscription } from "@/types/subscription.type";

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Subscription`);

  if (!res.ok) {
    throw new Error("Failed to fetch subscriptions");
  }

  return res.json();
};

export const getSubscriptionById = async (
  id: string
): Promise<Subscription> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Subscription/${id}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch subscription with id ${id}`);
  }

  return res.json();
};

export const createSubscription = async (
  subscriptionData: Subscription
): Promise<Subscription> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscriptionData),
  });

  if (!res.ok) {
    throw new Error("Failed to create subscription");
  }

  return res.json();
};

export const getSubscriptionsByUserId = async (
  userId: string
): Promise<Subscription[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Subscription/user/${userId}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch subscriptions for user with id ${userId}`);
  }

  return res.json();
};

export const getLatestSubscriptionByUserId = async (
  userId: string
): Promise<Subscription> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Subscription/user/${userId}/latest`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch latest subscription for user with id ${userId}`
    );
  }

  return res.json();
};
