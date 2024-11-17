import { Role } from "@prisma/client";
import { Badge } from "./ui/badge";
import clsx from "clsx";

export default function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      className={clsx(
        "border-2 hover:disable",
        role === "ADMIN" && "bg-stone-800 border-stone-600",
        role === "MANAGER" && "bg-stone-700 border-stone-500",
        role === "INSPECTOR" && "bg-stone-600 border-stone-400",
      )}
    >
      {role}
    </Badge>
  );
}
