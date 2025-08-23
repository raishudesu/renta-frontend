"use client";

import { updateBookingStatusAction } from "@/app/dashboard/bookings/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CompleteBookingDialog = ({ bookingId }: { bookingId: string }) => {
  const { execute, isPending } = useAction(updateBookingStatusAction, {
    onError: ({ error }) => {
      console.error("Booking completion failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Booking completed.",
        richColors: true,
      });
    },
  });

  const handleComplete = () => {
    const bodyObject = {
      id: bookingId,
      status: 3,
    };

    try {
      execute(bodyObject);
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500" size={"sm"}>
          Complete Booking
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will mark the booking as completed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleComplete}
            disabled={isPending}
            className="bg-green-500"
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Complete Booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompleteBookingDialog;
