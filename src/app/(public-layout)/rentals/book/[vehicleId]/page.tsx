import React from "react";
import { BookingForm } from "./booking-form";
import { getVehicleById } from "@/data-access/vehicle";

const BookingPage = async ({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}) => {
  const { vehicleId } = await params;

  const vehicleToBook = await getVehicleById(vehicleId);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Book a Vehicle
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kindly fill out the form to proceed.
        </p>
        <small>Vehicle ID: {vehicleId}</small>
      </div>
      <BookingForm vehicleToBook={vehicleToBook} />
    </main>
  );
};

export default BookingPage;
