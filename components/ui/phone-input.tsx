"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, PhoneIcon, CheckIcon } from "lucide-react";
import React, { useId, useState, useRef, useEffect } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
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

export default function PhoneInputWrapper() {
  const id = useId();
  const [value, setValue] = useState("");
  const [country, setCountry] = useState<RPNInput.Country | undefined>(undefined);

  const handleCountryChange = (newCountry: RPNInput.Country) => {
    setCountry(newCountry);
    setValue(`+${RPNInput.getCountryCallingCode(newCountry)}`);
  };

  return (
    <div className="*:not-first:mt-2" dir="ltr">
      <div className="flex">
        <CountrySelect
          value={country}
          onChange={handleCountryChange}
          disabled={false}
        />
        <RPNInput.default
          className="flex flex-1 rounded-md shadow-xs"
          international
          flagComponent={FlagComponent}
          countrySelectComponent={HiddenCountrySelect}
          inputComponent={PhoneInputField}
          id={id}
          placeholder="Enter phone number"
          value={value}
          onChange={(newValue) => setValue(newValue ?? "")}
          country={country}
        />
      </div>
    </div>
  );
}

const PhoneInputField = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn("rounded-l-none shadow-none focus-visible:z-10", className)}
      {...props}
    />
  );
};
PhoneInputField.displayName = "PhoneInputField";

const HiddenCountrySelect = () => null;

const CountrySelect = ({ disabled, value, onChange }: { disabled?: boolean; value: RPNInput.Country | undefined; onChange: (value: RPNInput.Country) => void; }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [countryList, setCountryList] = useState<Array<{ value: RPNInput.Country, label: string, code: string }>>([]);

  useEffect(() => {
    const countries = Object.entries(RPNInput.getCountries()).map(([country, countryCode]) => ({
      value: countryCode as RPNInput.Country,
      label: countryCode,
      code: RPNInput.getCountryCallingCode(countryCode as RPNInput.Country) || "1"
    }));
    setCountryList(countries);
    if (!value && countries.length > 0) {
      onChange(countries.find(c => c.value === 'US')?.value || countries[0].value);
    }
  }, []);

  const selectedCountry = value ? countryList.find(item => item.value === value) : null;
  const Flag = value && flags[value] ? flags[value] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button ref={buttonRef} disabled={disabled} className="border-input bg-background text-foreground hover:bg-accent focus:ring-ring/50 inline-flex items-center gap-2 self-stretch rounded-l-md border py-2 px-3 transition-all outline-none focus:z-10 focus:ring-2 disabled:pointer-events-none disabled:opacity-50" type="button">
          <span className="w-5 overflow-hidden rounded-sm">{Flag ? <Flag title={selectedCountry?.label || ''} /> : <PhoneIcon size={16} aria-hidden="true" />}</span>
          <span className="text-sm hidden sm:inline">{selectedCountry ? `+${selectedCountry.code}` : ''}</span>
          <ChevronDownIcon size={16} className="text-muted-foreground" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[220px]" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryList.map((country) => (
                <CommandItem key={country.value} value={`${country.label} ${country.value} +${country.code}`} onSelect={() => { onChange(country.value); setOpen(false); buttonRef.current?.focus(); }}>
                  <div className="flex items-center gap-2">
                    <span className="w-5 overflow-hidden rounded-sm">{flags[country.value] ? React.createElement(flags[country.value]!, { title: country.label }) : <PhoneIcon size={16} aria-hidden="true" />}</span>
                    <span>{country.label}</span>
                    <span className="text-muted-foreground ml-1">{`+${country.code}`}</span>
                    {country.value === value && <CheckIcon size={16} className="ml-auto" />}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = country && flags[country] ? flags[country] : null;
  return (
    <span className="w-5 overflow-hidden rounded-sm hidden">
      {Flag ? <Flag title={countryName} /> : <PhoneIcon size={16} aria-hidden="true" />}
    </span>
  );
};
