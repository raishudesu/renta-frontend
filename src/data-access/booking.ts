import { Booking } from "@/types/booking.type";

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
export const createBooking = async (bookingData: Booking): Promise<Booking> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
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
): Promise<Booking[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Booking/user/${userId}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch bookings for user with id ${userId}`);
  }

  return res.json();
};
