"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { FaRegTrashCan } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";

export default function SubjectTableDropdown({
  setCurrentSubject,
  subject,
  setIsEditOpen,
  setIsDeleteOpen,
  setIsDetailsOpen,
}) {
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
              setCurrentSubject(subject);
              setIsEditOpen(true);
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
              setCurrentSubject(subject);
              setIsDetailsOpen(true);
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
              setCurrentSubject(subject);
              setIsDeleteOpen(true);
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
