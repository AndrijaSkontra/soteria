import { AlertCircle } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Link } from "@/i18n/routing";

export default function PermissionDenied() {
  return (
    <div className="w-full flex justify-center items-center p-4 mt-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-500" aria-hidden="true" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Permission Denied
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Sorry, you don&apos;t have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <Button asChild className="font-semibold">
          <Link href="/select-organisation">Go back</Link>
        </Button>
      </div>
    </div>
  );
}
