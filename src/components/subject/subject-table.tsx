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
import { useIsMobile } from "@/hooks/use-mobile";

export default function SubjectsTable({ subjects }: { subjects: Subject[] }) {
  const isMobile = useIsMobile();

  return (
    <div className="border border-gray-200 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Naziv</TableHead>
            <TableHead hidden={isMobile}>Adresa</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>OIB</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell hidden={isMobile}>{subject.address}</TableCell>
              <TableCell>{subject.phone}</TableCell>
              <TableCell>{subject.email}</TableCell>
              <TableCell>{subject.oib}</TableCell>
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
