"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  bookingCreationSchema,
  type BookingCreation,
} from "@/schemas/booking.schema";
import { DateTimePicker } from "@/components/date-time-picker";
import { PhoneInput } from "@/components/phone-input";
import { Vehicle } from "@/types/vehicle.type";
import { Palette } from "lucide-react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { createBookingAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function BookingForm({ vehicleToBook }: { vehicleToBook: Vehicle }) {
  const router = useRouter();

  const form = useForm<BookingCreation>({
    resolver: zodResolver(bookingCreationSchema),
    defaultValues: {
      bookerName: "",
      bookerEmail: "",
      bookerPhone: "",
      userId: vehicleToBook.ownerId,
      vehicleId: vehicleToBook.id,
    },
  });

  const { execute, isPending } = useAction(createBookingAction, {
    onError: ({ error }) => {
      console.error("Booking creation failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Success!", {
        description:
          "Booking submitted successfully. Please wait for the vehicle owner to contact you directly.",
        richColors: true,
      });

      // router.replace("/confirm-email");
      router.replace(`/rentals/booking/${data.id}`);
    },
  });

  const handleSubmit = (values: BookingCreation) => {
    try {
      execute(values);
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Booking</CardTitle>
        <CardDescription>
          Fill out the form below to create a new vehicle booking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select start date & time"
                        disabled={(date) => date < new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select end date & time"
                        disabled={(date) => {
                          const startTime = form.getValues("startTime");
                          return (
                            date < new Date() ||
                            (startTime && date <= startTime)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Booker Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Booker Information</h3>

              <FormField
                control={form.control}
                name="bookerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Temporarily using simple input instead of PhoneInput to debug */}
              <FormField
                control={form.control}
                name="bookerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vehicle Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="line-clamp-1">
                    {vehicleToBook.modelName}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">{vehicleToBook.color}</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p className="line-clamp-3">{vehicleToBook.description}</p>
                  </div>
                </div>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={vehicleToBook.imagePreSignedUrl || "/placeholder.svg"}
                    alt={`${vehicleToBook.modelName} in ${vehicleToBook.color}`}
                    className="w-full rounded-t-lg object-cover"
                    loading="lazy"
                    fill
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Book Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
