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
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserStats } from "@/data-access/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Car, Info, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const userStats = await getUserStats(session?.user.id);

  return (
    <div className="w-full flex flex-col gap-4">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Welcome Section */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6">
          <div className="flex md:items-center flex-col md:flex-row gap-2 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello there!</h1>
              <p className="text-gray-600 mt-1">
                Here&lsquo;s what&lsquo;s happening with your products today.
              </p>
            </div>
          </div>
        </div>
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>MVP Notice:</strong> This system is currently in development
            and undergoing continuous improvements. Some features may be limited
            or subject to change.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Vehicles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vehicles
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userStats.totalVehicles}
              </div>
              <p className="text-xs text-muted-foreground">Active fleet size</p>
            </CardContent>
          </Card>

          {/* Active Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userStats.totalActiveBookings}
              </div>
              <p className="text-xs text-muted-foreground">Currently ongoing</p>
            </CardContent>
          </Card>

          {/* Completed Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Bookings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userStats.totalCompletedBookings}
              </div>
              <p className="text-xs text-muted-foreground">All time total</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
