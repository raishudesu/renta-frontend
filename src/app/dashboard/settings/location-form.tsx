"use client";
import { Suspense } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import { businessCoordinatesSchema } from "@/schemas/user.schema";
import { useAction } from "next-safe-action/hooks";
import { updateBusinessCoordinatesAction } from "./actions";
import { useSession } from "next-auth/react";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

export default function LocationForm() {
  const form = useForm<z.infer<typeof businessCoordinatesSchema>>({
    resolver: zodResolver(businessCoordinatesSchema),
    defaultValues: {
      businessCoordinatesString: "",
    },
  });

  const session = useSession();

  const handleLocationPick = (coordinates: string) => {
    form.setValue("businessCoordinatesString", coordinates);
  };

  const { execute, isPending } = useAction(updateBusinessCoordinatesAction, {
    onError: ({ error }) => {
      console.error("Update failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: async () => {
      toast.success("Success!", {
        description: "Your location has been updated successfully.",
        richColors: true,
      });

      await session.update({
        ...session,
        user: {
          businessCoordinatesSchema: form.getValues(
            "businessCoordinatesString"
          ),
        },
      });
    },
  });

  function onSubmit(values: z.infer<typeof businessCoordinatesSchema>) {
    try {
      execute(values);
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto py-10 w-full"
      >
        <FormField
          control={form.control}
          name="businessCoordinatesString"
          render={({}) => (
            <FormItem>
              <FormLabel>Your Business Location</FormLabel>
              <FormControl>
                <Suspense fallback={"Loading Map..."}>
                  <Map onLocationPicked={handleLocationPick} />
                </Suspense>
              </FormControl>
              <FormDescription>
                Click the marker first to drag and set your location.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
