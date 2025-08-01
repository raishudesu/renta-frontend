import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <div className="mt-4 ml-4 flex flex-col gap-6 items-start">
          <SidebarTrigger className="border" size={"lg"} />
        </div> */}
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
