"use client";

import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SubjectTableDropdown({ subject }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <BsThreeDotsVertical className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              urlSearchParams.set("edit", subject.id);
              router.replace(`${pathname}?${urlSearchParams.toString()}`);
            }}
          >
            <div className="flex items-center space-x-2">
              <FaRegEdit />
              <p>Uredi</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="md:hidden"
            onClick={() => {
              urlSearchParams.set("details", subject.id);
              router.replace(`${pathname}?${urlSearchParams.toString()}`);
            }}
          >
            <div className="flex items-center space-x-2">
              <CgDetailsMore />
              <p>Detalji</p>
            </div>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            onClick={() => {
              urlSearchParams.set("delete", subject.id);
              router.replace(`${pathname}?${urlSearchParams.toString()}`);
            }}
          >
            <div className="flex items-center space-x-2">
              <FaRegTrashCan className="fill-red-400" />
              <p>Ukloni</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
