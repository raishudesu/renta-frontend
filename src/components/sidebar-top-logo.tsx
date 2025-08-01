"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function SidebarTopLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="relative text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm overflow-clip">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src={"/logos/renta-logo.svg"} alt="renta-logo" fill />
            </div>
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">Renta</span>
            <span className="truncate text-xs">Dashboard</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
