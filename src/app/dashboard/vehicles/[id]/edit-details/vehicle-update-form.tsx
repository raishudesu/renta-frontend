"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, LoaderCircle, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { vehicleUpdateSchema } from "@/schemas/vehicle.schema";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicle.type";
import Image from "next/image";
import { updateVehicleAction } from "./actions";

export default function VehicleUpdateForm({
  userId,
  vehicleToUpdate,
}: {
  userId: string | undefined;
  vehicleToUpdate: Vehicle;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [updateImage, setUpdateImage] = useState<boolean>(false);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof vehicleUpdateSchema>>({
    resolver: zodResolver(vehicleUpdateSchema),
    defaultValues: {
      id: vehicleToUpdate.id,
      modelName: vehicleToUpdate.modelName || "",
      type: vehicleToUpdate.type.toString() || "", // Default to car
      color: vehicleToUpdate.color || "",
      description: vehicleToUpdate.description || "",
      plateNumber: vehicleToUpdate.plateNumber || "",
      ownerId: userId, // This should be set to the current user's ID
      vehicleImageFile: undefined,
    },
  });

  const { execute, isPending } = useAction(updateVehicleAction, {
    onError: ({ error }) => {
      console.error("Vehicle creation failed:", error);

      toast.error("Oops! Something went wrong.", {
        description: error.thrownError?.message || "Please try again later.",
        richColors: true,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Your vehicle has been updated successfully.",
        richColors: true,
      });

      // router.replace("/confirm-email");
      router.replace("/dashboard/vehicles");
    },
  });

  const onSubmit = async (values: z.infer<typeof vehicleUpdateSchema>) => {
    try {
      const finalValues = {
        ...values,
        vehicleImageFile: files ? files[0] : undefined, // Use the first file if available
      };

      execute(finalValues);
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-lg mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="modelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Vehicle's Model Name"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What&lsquo;s the Model Name of your vehicle?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Vehicle Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {["Car", "Motorcycle"].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={index.toString()} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>Is it a Car or Motorcyle?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Red" type="text" {...field} />
              </FormControl>
              <FormDescription>
                What&lsquo;s the color of your vehicle?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plateNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Your vehicle's plate number"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Kindly provide your vehicle&lsquo;s plate number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Super gas efficient"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe your vehicle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {updateImage ? (
          <>
            <FormField
              control={form.control}
              name="vehicleImageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload an Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className="text-gray-500 w-10 h-10" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG or JPG
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant={"outline"}
              onClick={() => setUpdateImage(false)}
            >
              Cancel Image Upload
            </Button>
          </>
        ) : (
          <>
            <div className="relative aspect-[16/9]">
              <Image
                src={
                  vehicleToUpdate.imagePreSignedUrl
                    ? (vehicleToUpdate.imagePreSignedUrl as string)
                    : "/placeholder.svg?height=320&width=480&query=vehicleToUpdate%20photo%20placeholder"
                }
                alt={"Photo of " + vehicleToUpdate.modelName}
                fill
                // sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                priority={false}
              />
            </div>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setUpdateImage(true)}
            >
              Upload New Image
            </Button>
          </>
        )}
        <Button type="submit" className="flex gap-2" disabled={isPending}>
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Update Vehicle
        </Button>
      </form>
    </Form>
  );
}
