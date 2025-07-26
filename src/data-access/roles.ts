export const addRole = async (role: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Account/roles/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(role),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add role");
  }

  return res.json();
};

export const addRoleToUser = async (role: string, userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Account/roles/add-to-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, userId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add role");
  }

  return res.json();
};
