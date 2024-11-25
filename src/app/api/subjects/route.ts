import { addSubjectToDB } from "@/lib/services/subject-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await addSubjectToDB(await request.json());
  return new NextResponse("Added subject", {
    status: 200,
  });
}
