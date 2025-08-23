import React from "react";
import BookingQr from "./booking-qr";
import { getBookingById } from "@/data-access/booking";
import { notFound } from "next/navigation";

const BookingQrPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: bookingId } = await params;

  const booking = await getBookingById(bookingId);

  if (!booking) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Booking Details
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Here is the QR code for this booking. Kindly download and show this QR
          for the vehicle owner to scan.
        </p>
        <small>Booking ID: {bookingId}</small>
      </div>
      <div className="flex items-center justify-center">
        <BookingQr bookingId={bookingId} />
      </div>
    </main>
  );
};

export default BookingQrPage;
