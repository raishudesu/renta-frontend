"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { countries } from "@/constants/country-codes";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className,
  disabled = false,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(countries[34]);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (value) {
      // Try to parse existing value to extract country code and number
      const country = countries.find((c) => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.slice(country.dialCode.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setOpen(false);
    const fullNumber = `${country.dialCode} ${phoneNumber}`.trim();
    onChange?.(fullNumber);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    const fullNumber = `${selectedCountry.dialCode} ${number}`.trim();
    onChange?.(fullNumber);
  };

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[140px] justify-between rounded-r-none border-r-0 px-3 bg-transparent"
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm font-medium">
                {selectedCountry.dialCode}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.dialCode}
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCountry.code === country.code
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="rounded-l-none flex-1"
        disabled={disabled}
      />
    </div>
  );
}
