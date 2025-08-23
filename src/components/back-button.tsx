"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="hover:underline cursor-pointer"
    >
      <ChevronLeft className="h-4 w-4" />
      Go Back
    </Button>
  );
};

export default BackButton;
