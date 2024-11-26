"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";
import { cookies } from "next/headers";
import { getCookie } from "@/lib/get-cookie";

export function SubmitButton({
  innerText,
  className,
}: {
  innerText: string;
  className: string;
}) {
  const { pending } = useFormStatus();
  const theme = getCookie("theme");

  return (
    <>
      {!pending ? (
        <Button className={`${className} py-2 px-4`} type="submit">
          {innerText}
        </Button>
      ) : (
        <Button className={`${className} py-2 px-4`} type="submit">
          {innerText}
          <ClipLoader color={theme === "dark" ? "#000000" : "#ffffff"} />
        </Button>
      )}
    </>
  );
}
