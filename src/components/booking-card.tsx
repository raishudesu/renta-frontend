import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, User, Car } from "lucide-react";
import { BookingWithVehicle } from "@/types/booking.type";
import { formatDateTime, formatTime } from "@/lib/utils";
import QrScannerDrawer from "./qr-scanner";
import { CancelBookingDialog } from "./cancel-booking-dialog";

interface BookingCardProps {
  booking: BookingWithVehicle;
}

const getStatusInfo = (status: number) => {
  switch (status) {
    case 0:
      return {
        label: "Pending",
        variant: "secondary" as const,
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      };
    case 1:
      return {
        label: "Confirmed",
        variant: "default" as const,
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      };
    case 2:
      return {
        label: "Cancelled",
        variant: "destructive" as const,
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      };
  }
};

export function BookingCard({ booking }: BookingCardProps) {
  const statusInfo = getStatusInfo(booking.status);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Booking ID: {booking.id || undefined}
          </CardTitle>
          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vehicle Information */}
        <div className="flex items-start gap-3 ">
          <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="w-full">
            <p className="font-medium">{booking.vehicleDetails.modelName}</p>
            <p className="text-sm text-muted-foreground">
              {booking.vehicleDetails.color} •{" "}
              {booking.vehicleDetails.description}
            </p>
          </div>
        </div>

        {/* Booking Time */}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">{formatDateTime(booking.startTime)}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </p>
          </div>
        </div>

        {/* Booker Information */}
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">{booking.bookerName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {booking.bookerPhone}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <QrScannerDrawer bookingId={booking.id} />
        <CancelBookingDialog bookingId={booking.id} />
      </CardFooter>
    </Card>
  );
}
