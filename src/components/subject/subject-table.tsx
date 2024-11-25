import { Subject } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import TableActionsDropDown from "./table-actions-dropdown";

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
                {subject.contact}
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
                <TableActionsDropDown subject={subject} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
