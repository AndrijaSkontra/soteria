"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

export function SubmitButton({ innerText }: { innerText: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button className="w-full" type="submit">
          {innerText}
        </Button>
      ) : (
        <ClipLoader />
      )}
    </>
  );
}
