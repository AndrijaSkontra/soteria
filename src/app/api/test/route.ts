import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const organisationId = cookieStore.get("active-organisation");
  return new NextResponse(`organisation: ${JSON.stringify(organisationId)}`);
}
