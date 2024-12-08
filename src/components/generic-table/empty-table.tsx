import { FileQuestion } from "lucide-react";

interface NoDataProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyTable({
  title = "No data available",
  description = "There are no items to display at the moment.",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-muted/30 rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
    </div>
  );
}
