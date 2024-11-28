"use client";
import { disableSubject } from "@/lib/serverActions/subject-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DeleteSubject({ setIsDeleteOpen, subject }) {
  const { toast } = useToast();

  function handleDelete() {
    try {
      disableSubject(subject.id);
      toast({
        title: `Removed ${subject.name}`,
        duration: 2000,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete subject",
        duration: 2000,
      });
    } finally {
      setIsDeleteOpen(false);
    }
  }
  return (
    <div className="flex space-x-2 items-center justify-end">
      <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          setIsDeleteOpen(false);
          disableSubject(subject.id);
          handleDelete();
        }}
      >
        Yes
      </Button>
    </div>
  );
}
