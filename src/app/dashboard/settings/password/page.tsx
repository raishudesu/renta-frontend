import React from "react";
import { ChangePasswordForm } from "./change-password-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renta | Settings | Password",
};

const PasswordPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Content */}
      <div className="flex flex-col gap-4">
        <ChangePasswordForm currentUserId={session?.user.id} />
      </div>
    </div>
  );
};

export default PasswordPage;
