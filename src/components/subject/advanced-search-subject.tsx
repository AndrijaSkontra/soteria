"use client";

import { DatePickerWithRange } from "../generic-table/date-picker-with-range";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CountrySelect } from "../ui/select-country";
import { Switch } from "../ui/switch";
import { addDays } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

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
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  // this will sync input fields with url search params
  useEffect(() => {
    setName(urlSearchParams.get("name") || "");
    setAddress(urlSearchParams.get("address") || "");
    setOib(urlSearchParams.get("oib") || "");
    setContact(urlSearchParams.get("contact") || "");
    setEmail(urlSearchParams.get("email") || "");
    setCountry(urlSearchParams.get("country") || "");

    const from = urlSearchParams.get("from");
    const to = urlSearchParams.get("to");

    if (from && to) {
      setDateRange({
        from: new Date(from),
        to: new Date(to),
      });
    }
  }, [searchParams, urlSearchParams]);

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
    router.replace(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <>
      <div className="flex space-x-2 items-center">
        <Switch
          checked={isOn}
          onCheckedChange={async () => {
            setIsOn(!isOn);
          }}
        />
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
                  <div className="col-span-2">
                    <p className="text-xs text-start">Name</p>
                    <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-start">Adresa</p>
                    <Input
                      className="col-span-2"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-start">Email</p>
                    <Input
                      className="col-span-2"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-start">Država</p>
                    <CountrySelect setDialogValue={setCountry} />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-start">Kontakt</p>
                    <Input
                      className="col-span-2"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-start">OIB</p>
                    <Input
                      className="col-span-2"
                      name="oib"
                      value={oib}
                      onChange={(e) => setOib(e.target.value)}
                    />
                  </div>

                  <div className="col-span-full md:col-span-4 2xl:col-span-2">
                    <p className="text-xs text-start">Date:</p>
                    <DatePickerWithRange
                      dateRange={dateRange}
                      setDateRangeAction={setDateRange}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-2 2xl:col-span-2 flex items-end">
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
