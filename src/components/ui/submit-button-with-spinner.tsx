"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

export function SubmitButton({
  innerText,
  className,
}: {
  innerText: string;
  className: string;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button className={`${className} py-2 px-4`} type="submit">
          {innerText}
        </Button>
      ) : (
        <Button className={`${className} py-2 px-4`} type="submit">
          {innerText}
          <ClipLoader />
        </Button>
      )}
    </>
  );
}
