"use client";

import { Scanner } from "@yudiel/react-qr-scanner";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateBookingStatusAction } from "@/app/dashboard/bookings/actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const QrScannerDrawer = ({ bookingId }: { bookingId: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { execute, isPending } = useAction(updateBookingStatusAction, {
    onError: ({ error }) => {
      console.error("Booking update failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Booking confirmed.",
        richColors: true,
      });
    },
  });
  const handleScan = (bookingIdFromQr: string) => {
    const bodyObject = {
      id: bookingId,
      status: 1,
    };

    if (bookingIdFromQr !== bookingId) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `You are scanning an invalid QR code for this booking.`,
      });

      return;
    }

    try {
      execute(bodyObject);
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error(error);
    }

    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm">Confirm booking</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Scan Booking QR</DrawerTitle>
            <DrawerDescription>
              Scan the booking QR code from the renter to confirm.
            </DrawerDescription>
          </DrawerHeader>
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Scanner onScan={(result) => handleScan(result[0].rawValue)} />
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QrScannerDrawer;
