import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const organisations = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Microsoft" },
  { id: 3, name: "Google" },
  { id: 4, name: "Cognism" },
  { id: 5, name: "Kodelab" },
  { id: 6, name: "Logi" },
  { id: 7, name: "Keychron" },
  { id: 8, name: "Bose" },
  { id: 9, name: "Kappa" },
  { id: 10, name: "Adidas" },
];

export default function ScrollableOrganisationTable() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl w-full">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center sticky top-0 bg-white z-10">
                  Name
                </TableHead>
                <TableHead className="text-center sticky top-0 bg-white z-10">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organisations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium text-center">
                    {org.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button>Change Organisation</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
