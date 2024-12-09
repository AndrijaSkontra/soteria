"use client";
import { Role, Subject } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import SubjectTableDropdown from "./subject-table-dropdown";
import clsx from "clsx";
import { useState } from "react";
import ResponsiveDialog from "../ui/responsive-dialog";
import DeleteSubject from "./delete-subject";
import SubjectDetails from "./subject-details";
import UpdateSubjectForm from "./update-subject-form";

export default function SubjectsTable({
  page,
  rows,
  subjects,
  roles,
}: {
  page: number;
  rows: number;
  subjects: Subject[];
  roles: Role[];
}) {
  const isAdmin = roles.includes("ADMIN");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);

  return (
    <div className="border border-gray-200 rounded-lg overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="xl:table-cell hidden">#</TableHead>
            <TableHead>Naziv</TableHead>
            <TableHead className="xl:table-cell hidden">Adresa</TableHead>
            <TableHead className="md:table-cell hidden">Kontakt</TableHead>
            <TableHead className="xl:table-cell hidden">E-mail</TableHead>
            <TableHead className="xl:table-cell hidden">Država</TableHead>
            <TableHead className="xl:table-cell hidden">OIB</TableHead>
            <TableHead className={clsx("text-center", !isAdmin && "hidden")}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell className="xl:table-cell hidden">
                {Number(index + 1) + Number(page - 1) * Number(rows)}
              </TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.address || "-"}</TableCell>
              <TableCell className="md:table-cell hidden">{subject.contact || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.email || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.country || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.oib || "-"}</TableCell>
              <TableCell className={clsx("text-center", !isAdmin && "hidden")}>
                <SubjectTableDropdown
                  subject={subject}
                  setIsEditOpen={setIsEditModalOpen}
                  setIsDeleteOpen={setIsDeleteModalOpen}
                  setIsDetailsOpen={setIsDetailsModalOpen}
                  setCurrentSubject={setCurrentSubject}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ResponsiveDialog
        isOpen={isDetailsModalOpen}
        setIsOpenAction={setIsDetailsModalOpen}
        title={`Details`}
        description="Subject info"
      >
        <SubjectDetails subject={currentSubject} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isEditModalOpen}
        setIsOpenAction={setIsEditModalOpen}
        title={`Edit`}
        description="Change data about the subject"
      >
        <UpdateSubjectForm setIsOpenAction={setIsEditModalOpen} subject={currentSubject} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteModalOpen}
        setIsOpenAction={setIsDeleteModalOpen}
        title={`Remove`}
        description="Are you sure you want to remove this subject?"
      >
        <DeleteSubject setIsDeleteOpen={setIsDeleteModalOpen} subject={currentSubject} />
      </ResponsiveDialog>
    </div>
  );
}
