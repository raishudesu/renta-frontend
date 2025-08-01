import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function VehiclesPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>My Vehicles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center space-x-2">
          <Button
            asChild
            className="hidden md:flex bg-green-600 hover:bg-green-700"
          >
            <Link href={"/dashboard/vehicles/create"}>
              <Plus className="h-4 w-4 mr-2" />
              Add a Vehicle
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Welcome Section */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6">
          <div className="flex md:items-center flex-col md:flex-row gap-2 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Vehicles</h1>
              <p className="text-gray-600 mt-1">
                Here you can manage your vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
