"use client";
import { Subject } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SubjectsTable({ subjects }: { subjects: Subject[] }) {
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
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell className="xl:table-cell hidden">
                {index + 1}
              </TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.address}
              </TableCell>
              <TableCell className="md:table-cell hidden">
                {subject.phone}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.email}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.country}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.oib}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <BsThreeDotsVertical className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        /* Edit action */
                      }}
                    >
                      Uredi
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        /* Remove action */
                      }}
                    >
                      Ukloni
                    </DropdownMenuItem>
                    <DropdownMenuItem className="md:hidden" onClick={() => {}}>
                      Detalji
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
