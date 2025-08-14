import { authOptions } from "@/lib/auth";
import { BookingCreation } from "@/schemas/booking.schema";
import { Booking, BookingWithVehicle } from "@/types/booking.type";
import { getServerSession } from "next-auth";

export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking`);

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch booking with id ${id}`);
  }

  return res.json();
};
export const createBooking = async (
  bookingData: BookingCreation
): Promise<Booking> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  console.log(res);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create booking");
  }

  return res.json();
};

export const updateBooking = async (
  id: string,
  bookingData: Booking
): Promise<Booking> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update booking with id ${id}`);
  }

  return res.json();
};

export const updateBookingStatus = async (
  id: string,
  bookingStatus: number
) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify(bookingStatus),
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(errorText || "Failed to update booking status");
  }

  return res.json();
};

export const deleteBooking = async (id: string): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete booking with id ${id}`);
  }

  return;

  // No content response, so no need to return anything
};

export const getBookingsByUserId = async (
  userId: string
): Promise<BookingWithVehicle[]> => {
  const session = await getServerSession(authOptions);

  if (userId !== session?.user.id) throw new Error("User id does not match!");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Booking/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      errorText || `Failed to fetch bookings for user with id ${userId}`
    );
  }

  return res.json();
};
