"use client";

import { deleteVehicleAction } from "@/app/dashboard/vehicles/actions";
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
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function VehicleDeletionAlertDialog({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const { execute, isPending } = useAction(deleteVehicleAction, {
    onError: ({ error }) => {
      console.error("Vehicle deletion failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Vehicle removed successfully.",
        richColors: true,
      });
    },
  });

  const handleDelete = () => {
    execute({ id: vehicleId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={"sm"}>
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive"
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
