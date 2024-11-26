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
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import { Button } from "../ui/button";
import { Subject } from "@prisma/client";
import { disableSubject } from "@/lib/serverActions/subject-actions";

export default function TableActionsDropDown({
  subject,
}: {
  subject: Subject;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={`Edit ${subject.name}`}
        description="Change data about the subject"
      >
        <div className="flex space-x-2 items-center justify-end">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Confirm</Button>
        </div>
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={`Remove ${subject.name}`}
        description="Are you sure you want to remove this subject?"
      >
        <div className="flex space-x-2 items-center justify-end">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsDeleteOpen(false);
              disableSubject(subject.id);
            }}
          >
            Yes
          </Button>
        </div>
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <BsThreeDotsVertical className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <div className="flex items-center space-x-2">
              <FaRegEdit />
              <p>Uredi</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="md:hidden">Detalji</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
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
