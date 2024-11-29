import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../generic-table/date-picker-with-range";

export default function AdvancedSearchSubject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 grid-cols-1 md:grid-cols-7">
          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label>Time Range</Label>
            <DatePickerWithRange />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="oib">OIB</Label>
            <Input id="oib" />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="country">Country</Label>
            <Input id="country" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
