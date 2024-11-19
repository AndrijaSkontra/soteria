import { AdminViewCardDataType } from "@/types/app-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminViewCard({
  title,
  dataNumber,
  buttonText,
  icon,
}: AdminViewCardDataType) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>Optional description about the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-center">{dataNumber}</p>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
