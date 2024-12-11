"use client";
import { disableSubject } from "@/lib/server-actions/subject-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

export default function DeleteSubject({ setIsDeleteOpen, subject }) {
  const { toast } = useToast();
  const params = useParams();

  function handleDelete() {
    disableSubject(subject.id, params.organisationId as string)
      .then(() => {
        toast({
          title: `Removed ${subject.name}`,
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "You don't have permissions to delete this subject!",
          duration: 2000,
        });
      });
    setIsDeleteOpen(false);
  }
  return (
    <div className="flex space-x-2 items-center justify-end">
      <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          setIsDeleteOpen(false);
          handleDelete();
        }}
      >
        Yes
      </Button>
    </div>
  );
}
