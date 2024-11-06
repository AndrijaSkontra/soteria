import prisma from "..";

export default async function Home() {
  await prisma.user.create({ data: { firstName: "hi hi", lastName: "world" } });

  return <div>hello</div>;
}
