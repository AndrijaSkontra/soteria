"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../generic-table/date-picker-with-range";
import { CountrySelect } from "../ui/select-country";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

export default function AdvancedSearchSubject({ isOn, setIsOn }) {
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

  async function handleAdvSearchClick() {
    urlSearchParams.set("search", "");
    urlSearchParams.set("from", dateRange.from.toISOString());
    urlSearchParams.set("to", dateRange.to.toISOString());
    urlSearchParams.set("country", country);
    urlSearchParams.set("name", name);
    urlSearchParams.set("address", address);
    urlSearchParams.set("oib", oib);
    urlSearchParams.set("contact", contact);
    urlSearchParams.set("email", email);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <>
      <div className="flex space-x-2 items-center">
        <Switch checked={isOn} onCheckedChange={() => setIsOn(!isOn)} />
        <p className="text-center text-sm">Advanced search</p>
      </div>
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center overflow-hidden"
          >
            <Card
              className="pt-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdvSearchClick();
                }
              }}
            >
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-6 2xl:grid-cols-8">
                  <Input
                    className="col-span-2"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    className="col-span-2"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <Input
                    className="col-span-2"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="col-span-2">
                    <CountrySelect setDialogValue={setCountry} />
                  </div>

                  <Input
                    className="col-span-2"
                    name="contact"
                    placeholder="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />

                  <Input
                    className="col-span-2"
                    name="oib"
                    placeholder="OIB"
                    value={oib}
                    onChange={(e) => setOib(e.target.value)}
                  />

                  <div className="col-span-full md:col-span-4 2xl:col-span-2">
                    <DatePickerWithRange setDateRangeAction={setDateRange} className="w-full" />
                  </div>
                  <div className="col-span-2 md:col-span-2 2xl:col-span-2">
                    <Button className="w-full" variant="secondary" onClick={handleAdvSearchClick}>
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
