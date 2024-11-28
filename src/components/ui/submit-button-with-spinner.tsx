"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";
import { getCookie } from "@/lib/get-cookie";

export function SubmitButton({
  innerText,
  className,
}: {
  innerText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const theme = getCookie("theme");

  return (
    <>
      {!pending ? (
        <Button className={`${className || ""} py-2 px-4`} type="submit">
          {innerText}
        </Button>
      ) : (
        <Button
          className={`${className || ""} py-2 px-4 flex space-x-2`}
          onClick={(e) => e.preventDefault()}
        >
          <p>{innerText}</p>
          <ClipLoader color={theme === "dark" ? "#000000" : "#ffffff"} />
        </Button>
      )}
    </>
  );
}
