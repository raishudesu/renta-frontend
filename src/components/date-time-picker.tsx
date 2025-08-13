"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  label = "Date & Time",
  placeholder = "Select date & time",
  disabled,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState("");

  // Initialize time value when date changes
  React.useEffect(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      setTimeValue(`${hours}:${minutes}`);
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && timeValue) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      selectedDate.setHours(hours, minutes, 0, 0);
      onChange?.(selectedDate);
    } else if (selectedDate) {
      // Set default time to current time
      const now = new Date();
      selectedDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
      onChange?.(selectedDate);
    }
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setTimeValue(time);
    if (value && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(value);
      newDate.setHours(hours, minutes, 0, 0);
      onChange?.(newDate);
    }
  };

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      <div className="flex flex-col gap-3 flex-1">
        <Label className="px-1">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between font-normal bg-transparent"
            >
              {value ? value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <Label className="px-1">Time</Label>
        <Input
          type="time"
          step={60}
          value={timeValue}
          onChange={handleTimeChange}
          className="bg-background"
        />
      </div>
    </div>
  );
}
