import Footer from "@/components/footer";
import Header from "@/components/header";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { ReactNode } from "react";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await getServerSession(authOptions);

  // console.log("Session in PublicLayout:", session);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
