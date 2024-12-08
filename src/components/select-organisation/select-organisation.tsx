"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiOutlineEmojiSad } from "react-icons/hi";
import RoleBadge from "@/components/ui/role-badge";
import { OrganisationWithRoles } from "@/types/app-types";

export default function SelectOrganisation({
  organisationsWithRoles,
}: {
  organisationsWithRoles: OrganisationWithRoles[];
}) {
  const [selectedOrganisationId, setSelectedOrganisationId] = useState<string>("");

  function handleOrganisationClick(orgWithRoles: OrganisationWithRoles) {
    setSelectedOrganisationId(orgWithRoles.organisation.id);
  }

  if (organisationsWithRoles.length === 0) {
    return (
      <div
        className="bg-white dark:bg-stone-950 p-6 space-x-2
        rounded-lg shadow-md border border-gray-200 max-w-xl w-full flex justify-center items-center"
      >
        <p>No organisation</p>
        <HiOutlineEmojiSad className="size-8 stroke-yellow-500" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-950 p-6 rounded-lg shadow-md border border-gray-200 max-w-xl w-full">
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
                  <div className="flex space-x-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src={orgWithRoles.organisation.url}
                        className="rounded-full object-scale-down border-2 border-gray-400 p-1"
                      />
                      <AvatarFallback>ORG</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-xl">{orgWithRoles.organisation.name}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row space-x-2 items-center mt-2">
                  {orgWithRoles.role.map((role, index) => {
                    return <RoleBadge key={index} role={role} />;
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </ScrollArea>
      <div className="w-full flex justify-center">
        <Link
          href={`/${selectedOrganisationId}/dashboard`}
          className={clsx("", selectedOrganisationId === "" && "pointer-events-none")}
        >
          <Button disabled={selectedOrganisationId === ""}>Go To Organisation</Button>
        </Link>
      </div>
    </div>
  );
}
