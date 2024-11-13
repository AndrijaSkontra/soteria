"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganisationWithRoles } from "@/app-types";
import { Link } from "@/i18n/routing";
import { Separator } from "./ui/separator";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "./ui/button";

export default function SelectOrganisation({
  organisationsWithRoles,
}: {
  organisationsWithRoles: OrganisationWithRoles[];
}) {
  const [selectedOrganisationId, setSelectedOrganisationId] =
    useState<string>("");

  function handleOrganisationClick(orgWithRoles: OrganisationWithRoles) {
    setSelectedOrganisationId(orgWithRoles.organisation.id);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-xl w-full">
      <h1 className="text-l font-semibold">Select Your Organization</h1>
      <p className="text-sm text-gray-400">
        After selecting the organisation you can continue to use the application
      </p>
      <ScrollArea className="h-[500px] sm:p-10">
        {organisationsWithRoles.map((orgWithRoles) => {
          return (
            <Card
              key={orgWithRoles.organisation.id}
              className={clsx(
                `cursor-pointer m-4 transition-all`,
                orgWithRoles.organisation.id === selectedOrganisationId
                  ? "ring-2 ring-blue-500 shadow-lg scale-105"
                  : "hover:shadow-md",
              )}
              onClick={() => handleOrganisationClick(orgWithRoles)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {orgWithRoles.organisation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Separator />
                <div className="flex flex-row space-x-2 items-center">
                  {orgWithRoles.role.map((role, index) => {
                    return <p key={index}>{role}</p>;
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </ScrollArea>
      <div className="w-full flex justify-center">
        <Link href={`/${selectedOrganisationId}/dashboard`}>
          <Button disabled={selectedOrganisationId === ""}>
            Go To Organisation
          </Button>
        </Link>
      </div>
    </div>
  );
}
