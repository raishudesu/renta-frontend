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
import VehicleCreationForm from "./vehicle-creation-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function VehicleCreationPage() {
  const session = await getServerSession(authOptions);

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
              <BreadcrumbLink href="/dashboard/vehicles">
                My Vehicles
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Add Vehicle</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Welcome Section */}
        {/* <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6">
          <div className="flex md:items-center flex-col md:flex-row gap-2 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Vehicles</h1>
              <p className="text-gray-600 mt-1">
                Here you can manage your vehicles.
              </p>
            </div>
          </div>
        </div> */}
        <VehicleCreationForm userId={session?.user.id} />
      </div>
    </div>
  );
}
