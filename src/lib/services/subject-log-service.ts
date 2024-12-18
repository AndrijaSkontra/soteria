import { getUserId } from "../get-user-id";
import { Action } from "@prisma/client";

import prisma from "@/index";

export async function addSubjectLogToDB(action: Action) {
  await prisma.subjectLog.create({
    data: {
      userId: await getUserId(),
      action: action,
    },
  });
}
