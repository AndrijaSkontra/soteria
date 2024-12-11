"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const countries = [
  { value: "Albania", label: "AL" },
  { value: "Andorra", label: "AD" },
  { value: "Armenia", label: "AM" },
  { value: "Austria", label: "AT" },
  { value: "Azerbaijan", label: "AZ" },
  { value: "Belarus", label: "BY" },
  { value: "Belgium", label: "BE" },
  { value: "Bosnia and Herzegovina", label: "BA" },
  { value: "Bulgaria", label: "BG" },
  { value: "Croatia", label: "HR" },
  { value: "Cyprus", label: "CY" },
  { value: "Czech Republic", label: "CZ" },
  { value: "Denmark", label: "DK" },
  { value: "Estonia", label: "EE" },
  { value: "Finland", label: "FI" },
  { value: "France", label: "FR" },
  { value: "Georgia", label: "GE" },
  { value: "Germany", label: "DE" },
  { value: "Greece", label: "GR" },
  { value: "Hungary", label: "HU" },
  { value: "Iceland", label: "IS" },
  { value: "Ireland", label: "IE" },
  { value: "Italy", label: "IT" },
  { value: "Kazakhstan", label: "KZ" },
  { value: "Kosovo", label: "XK" },
  { value: "Latvia", label: "LV" },
  { value: "Liechtenstein", label: "LI" },
  { value: "Lithuania", label: "LT" },
  { value: "Luxembourg", label: "LU" },
  { value: "Malta", label: "MT" },
  { value: "Moldova", label: "MD" },
  { value: "Monaco", label: "MC" },
  { value: "Montenegro", label: "ME" },
  { value: "Netherlands", label: "NL" },
  { value: "North Macedonia", label: "MK" },
  { value: "Norway", label: "NO" },
  { value: "Poland", label: "PL" },
  { value: "Portugal", label: "PT" },
  { value: "Romania", label: "RO" },
  { value: "Russia", label: "RU" },
  { value: "San Marino", label: "SM" },
  { value: "Serbia", label: "RS" },
  { value: "Slovakia", label: "SK" },
  { value: "Slovenia", label: "SI" },
  { value: "Spain", label: "ES" },
  { value: "Sweden", label: "SE" },
  { value: "Switzerland", label: "CH" },
  { value: "Turkey", label: "TR" },
  { value: "Ukraine", label: "UA" },
  { value: "United Kingdom", label: "UK" },
  { value: "Vatican City", label: "VA" },
];
export function CountrySelect({
  setDialogValue,
  defaultCountry,
}: {
  setDialogValue: (country: any) => any;
  defaultCountry?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultCountry || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value
            ? countries.find((framework) => framework.value === value)?.value
            : "Select country"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No country with that name.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setDialogValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {country.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
