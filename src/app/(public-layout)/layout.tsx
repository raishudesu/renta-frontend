import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
