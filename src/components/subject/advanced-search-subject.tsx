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
                <div className="space-y-4">
                  <div className="upper-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Name:</p>
                      <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Address:</p>
                      <Input
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Country:</p>
                      <CountrySelect setDialogValue={setCountry} />
                    </div>
                  </div>

                  <div className="lower-row flex flex-col md:flex-row w-full gap-x-6 space-y-4 md:space-y-0">
                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">OIB:</p>
                      <Input name="oib" value={oib} onChange={(e) => setOib(e.target.value)} />
                    </div>

                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Time Range:</p>
                      <DatePickerWithRange setDateRangeAction={setDateRange} />
                    </div>

                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Contact:</p>
                      <Input
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>

                    <div className="grow flex items-center space-x-2">
                      <p className="text-sm">Email:</p>
                      <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Button
                      className="grow"
                      variant="secondary"
                      onClick={handleAdvSearchClick}
                      onKeyDown={("enter", handleAdvSearchClick)}
                    >
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
