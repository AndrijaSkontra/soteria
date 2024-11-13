"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Organisation } from "@/app-types";

export default function SelectOrganisation({
  organisations,
}: {
  organisations: Organisation[];
}) {
  const [focusedCompany, setFocusedCompany] = useState(null);

  const handleCardClick = (company) => {
    setFocusedCompany(company);
  };

  const companies = organisations;
  console.log(companies, "aaa 📝");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-xl w-full">
      <h1 className="text-l font-semibold">Select Your Organization</h1>
      <p className="text-sm text-gray-400">
        After selecting you can continue to use the application
      </p>
      <ScrollArea className="h-[500px] sm:p-10">
        {companies.map((company) => (
          <Card
            key={company.name.toLowerCase()}
            className={`cursor-pointer m-4 transition-all ${
              focusedCompany === company.name.toLowerCase()
                ? "ring-2 ring-blue-500 shadow-lg scale-105"
                : "hover:shadow-md"
            }`}
            onClick={() => handleCardClick(company.name.toLowerCase())}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {company.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Click to select {company.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
