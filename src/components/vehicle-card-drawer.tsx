"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { VehicleWithOwner } from "@/types/vehicle.type";
import Image from "next/image";
import { Palette, User2 } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { initials } from "./vehicle-public-card";
import Link from "next/link";

const VehiclePublicCardDrawer = ({
  vehicle,
}: {
  vehicle: VehicleWithOwner;
}) => {
  const ownerFull = `${vehicle.ownerName.firstName} ${vehicle.ownerName.lastName}`;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm">View details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>{vehicle.modelName}</DrawerTitle>
            <DrawerDescription>{vehicle.description}</DrawerDescription>
          </DrawerHeader>
          <div className="relative aspect-[16/9]">
            <Image
              src={vehicle.imagePreSignedUrl || "/placeholder.svg"}
              alt={`${vehicle.modelName} in ${vehicle.color}`}
              className="w-full rounded-t-lg object-cover"
              loading="lazy"
              fill
            />
            <div className="pointer-events-none absolute left-2 top-2 flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="line-clamp-1">{vehicle.color}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {initials(
                  vehicle.ownerName.firstName,
                  vehicle.ownerName.lastName
                )}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-sm">
                <User2 className="h-4 w-4 text-muted-foreground" />
                <span className="line-clamp-1">{ownerFull}</span>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button asChild>
              <Link href={`/rentals/book/${vehicle.id}`}>
                Rent this Vehicle
              </Link>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VehiclePublicCardDrawer;
