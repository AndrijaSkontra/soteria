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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [oib, setOib] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -20),
    to: new Date(),
  });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  async function handleSubmit(event) {
    event.preventDefault();

    urlSearchParams.set("name", name);
    urlSearchParams.set("address", address);
    urlSearchParams.set("oib", oib);
    urlSearchParams.set("contact", contact);
    urlSearchParams.set("email", email);
    urlSearchParams.set("country", country);
    urlSearchParams.set("from", dateRange.from.toISOString());
    urlSearchParams.set("to", dateRange.to.toISOString());
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="upper-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="name">Name</Label>
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="grow">
              <Label htmlFor="address">Address</Label>
              <Input name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="grow">
              <Label htmlFor="country">Country</Label>
              <CountrySelect setDialogValue={setCountry} />
            </div>
          </div>

          <div className="lower-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="oib">OIB</Label>
              <Input name="oib" value={oib} onChange={(e) => setOib(e.target.value)} />
            </div>

            <div className="grow">
              <Label htmlFor="contact">Contact</Label>
              <Input name="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>

            <div className="grow">
              <Label htmlFor="email">Email</Label>
              <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
