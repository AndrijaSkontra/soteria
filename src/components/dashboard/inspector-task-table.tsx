"use client";
import { GiHammerNails } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format-date";
import { useLocale } from "next-intl";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "@/i18n/routing";

export default function InstructorTaskTable() {
  const locale = useLocale();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Inspection Type</TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead className="text-center">Deadline</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">
              {getTaskTypeIcon(item.type)}
            </TableCell>
            <TableCell>
              <Link href="#" className="hover:underline">
                {item.taskName}
              </Link>
            </TableCell>
            <TableCell
              className={`text-center font-medium text-nowrap 
              ${getDateClasses(item.deadline)}`}
            >
              {formatDate(item.deadline, locale)}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical className="size-5 inline-block hover:fill-gray-300" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Location</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Accept</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getTaskTypeIcon(type: string) {
  if (type === "P") {
    return <GiHammerNails className="size-5 inline-block" />;
  } else if (type === "C") {
    return <GrDocumentConfig className="size-5 inline-block" />;
  } else if (type === "A") {
    return <FaRegCalendarAlt className="size-5 inline-block" />;
  } else {
    return "";
  }
}

function getDateClasses(dateString: string): string {
  const deadlineDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (deadlineDate < today) {
    return "text-red-500 dark:text-red-700";
  } else {
    return "";
  }
}

const data = [
  {
    id: 1,
    type: "P",
    taskName: "Post installation inspection Central Park",
    deadline: "03-20-2025",
  },
  {
    id: 2,
    type: "C",
    taskName: "Certificate inspection Griffin Park",
    deadline: "02-22-2024",
  },
  {
    id: 3,
    type: "C",
    taskName: "Certificate inspection Lemon Park",
    deadline: "03-05-2025",
  },
  {
    id: 4,
    type: "P",
    taskName: "Post installation inspection Central Park",
    deadline: "03-20-2025",
  },
  {
    id: 5,
    type: "A",
    taskName: "Annual inspection Griffin Park",
    deadline: "02-22-2024",
  },
  {
    id: 6,
    type: "C",
    taskName: "Certificate inspection Lemon Park",
    deadline: "03-05-2025",
  },
];