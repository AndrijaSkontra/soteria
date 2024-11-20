import { Role } from "@prisma/client";
import { Badge } from "./badge";
import clsx from "clsx";

export default function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      className={clsx(
        "border-2 hover:disable",
        role === "ADMIN" &&
          `bg-red-300 border-red-500 text-red-800
            dark:border-red-500 dark:text-red-100 dark:bg-red-800 dark:bg-opacity-50`,
        role === "MANAGER" &&
          `bg-orange-200 border-orange-500 text-orange-900
            dark:border-orange-500 dark:text-orange-100 dark:bg-orange-800 dark:bg-opacity-50`,
        role === "INSPECTOR" &&
          `bg-yellow-200 border-yellow-500 text-yellow-800
            dark:border-yellow-500 dark:text-yellow-100 dark:bg-yellow-800 dark:bg-opacity-50`,
      )}
    >
      {role}
    </Badge>
  );
}
