import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex py-24">{children}</div>;
};

export default AuthLayout;
