"use server";

import { updateBookingStatus } from "@/data-access/booking";
import { actionClient } from "@/lib/safe-action";
import { bookingStatusUpdateSchema } from "@/schemas/booking.schema";
import { revalidatePath } from "next/cache";

export const updateBookingStatusAction = actionClient
  .inputSchema(bookingStatusUpdateSchema)
  .action(async ({ parsedInput }) => {
    const res = await updateBookingStatus(parsedInput.id, parsedInput.status);

    revalidatePath("/dashboard/bookings");

    return res;
  });
