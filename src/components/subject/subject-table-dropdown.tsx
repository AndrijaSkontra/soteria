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
import ResponsiveDialog from "../ui/responsive-dialog";
import { Subject } from "@prisma/client";
import UpdateSubjectForm from "./update-subject-form";
import { CgDetailsMore } from "react-icons/cg";
import SubjectDetails from "./subject-details";
import DeleteSubject from "./delete-subject";

export default function SubjectTableDropdown({
  subject,
}: {
  subject: Subject;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
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
          <DropdownMenuItem
            className="md:hidden"
            onClick={() => setIsDetailsOpen(true)}
          >
            <div className="flex items-center space-x-2">
              <CgDetailsMore />
              <p>Detalji</p>
            </div>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            <div className="flex items-center space-x-2">
              <FaRegTrashCan className="fill-red-400" />
              <p>Ukloni</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveDialog
        isOpen={isDetailsOpen}
        setIsOpenAction={setIsDetailsOpen}
        title={`Details ${subject.name}`}
        description="Subject info"
      >
        <SubjectDetails subject={subject} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpenAction={setIsEditOpen}
        title={`Edit ${subject.name}`}
        description="Change data about the subject"
      >
        <UpdateSubjectForm setIsOpenAction={setIsEditOpen} subject={subject} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpenAction={setIsDeleteOpen}
        title={`Remove ${subject.name}`}
        description="Are you sure you want to remove this subject?"
      >
        <DeleteSubject setIsDeleteOpen={setIsDeleteOpen} subject={subject} />
      </ResponsiveDialog>
    </>
  );
}
