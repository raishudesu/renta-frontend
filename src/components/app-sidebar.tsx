import {
  Car,
  HandCoins,
  LayoutDashboard,
  NotebookPen,
  PackageSearch,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarTopLogo } from "./sidebar-top-logo";
import { NavUser } from "./nav-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Vehicles",
    url: "/dashboard/vehicles",
    icon: Car,
  },
  {
    title: "My Bookings",
    url: "/dashboard/bookings",
    icon: NotebookPen,
  },

  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  const userDetails = {
    name: `${session?.user?.firstName} ${session?.user?.lastName}` || "Guest",
    email: session?.user?.email || "No email",
    avatar: session?.user?.image || "/default-avatar.png",
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTopLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-2">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
    </Sidebar>
  );
}
