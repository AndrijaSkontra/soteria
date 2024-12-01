"use client";
import React, { useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../generic-table/date-picker-with-range";
import { CountrySelect } from "../ui/select-country";
import { advancedSearchAction } from "@/lib/serverActions/subject-actions";

const initialState = {
  message: "",
  errors: {},
};

export default function AdvancedSearchSubject() {
  const [country, setCountry] = useState("");
  const [state, formAction] = useActionState(
    advancedSearchAction,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="upper-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>

            <div className="grow">
              <Label htmlFor="address">Address</Label>
              <Input id="address" />
            </div>

            <div className="grow">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                className="hidden"
                readOnly={true}
                value={country}
              />
              <CountrySelect setDialogValue={setCountry} />
            </div>
          </div>

          <div className="lower-row flex-col md:flex-row flex w-full gap-x-6 space-y-4 md:space-y-0">
            <div className="grow">
              <Label htmlFor="oib">OIB</Label>
              <Input id="oib" />
            </div>

            <div className="grow">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" />
            </div>

            <div className="grow">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>

            <div className="grow">
              <Label>Time Range</Label>
              <DatePickerWithRange />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
