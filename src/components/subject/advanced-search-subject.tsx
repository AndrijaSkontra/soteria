"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../generic-table/date-picker-with-range";
import { CountrySelect } from "../ui/select-country";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays } from "date-fns";
export default function AdvancedSearchSubject() {
  const [country, setCountry] = useState("");
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(new Date()), -20),
    to: new Date(),
  });
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  async function handleSubmit(formData) {
    urlSearchParams.set("name", formData.get("name"));
    urlSearchParams.set("address", formData.get("address"));
    urlSearchParams.set("oib", formData.get("oib"));
    urlSearchParams.set("contact", formData.get("contact"));
    urlSearchParams.set("email", formData.get("email"));
    urlSearchParams.set("country", country);
    urlSearchParams.set("from", JSON.stringify(dateRange.from));
    urlSearchParams.set("to", JSON.stringify(dateRange.to));
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={handleSubmit}>
          <div className="upper-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="name">Name</Label>
              <Input name="name" />
            </div>

            <div className="grow">
              <Label htmlFor="address">Address</Label>
              <Input name="address" />
            </div>

            <div className="grow">
              <Label htmlFor="country">Country</Label>
              <CountrySelect setDialogValue={setCountry} />
            </div>
          </div>

          <div className="lower-row flex-col md:flex-row flex w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="oib">OIB</Label>
              <Input name="oib" />
            </div>

            <div className="grow">
              <Label htmlFor="contact">Contact</Label>
              <Input name="contact" />
            </div>

            <div className="grow">
              <Label htmlFor="email">Email</Label>
              <Input name="email" />
            </div>

            <div className="grow">
              <Label>Time Range</Label>
              <DatePickerWithRange setDateRangeAction={setDateRange} />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
