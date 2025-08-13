"use server";

import { createBooking } from "@/data-access/booking";
import { actionClient } from "@/lib/safe-action";
import { bookingCreationSchema } from "@/schemas/booking.schema";

export const createBookingAction = actionClient
  .inputSchema(bookingCreationSchema)
  .action(async ({ parsedInput }) => {
    const res = await createBooking(parsedInput);

    return res;
  });
