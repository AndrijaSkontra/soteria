"use client";

import { Subject } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div>
      <div className="flex items-center space-x-2 my-4">
        <Input placeholder="Pretraživanje" />
        <Button>Pretraži</Button>
        <Button variant="secondary">Očisti</Button>
        <Button variant="outline">+ Subjekt</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Naziv</TableHead>
            <TableHead>Adresa</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>OIB</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {subject.firstName} {subject.lastName}
              </TableCell>
              <TableCell>{subject.address}</TableCell>
              <TableCell>{subject.phone}</TableCell>
              <TableCell>{subject.email}</TableCell>
              <TableCell>{subject.oib}</TableCell>
              <TableCell>
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
