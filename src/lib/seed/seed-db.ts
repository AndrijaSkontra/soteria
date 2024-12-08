const { PrismaClient } = require("@prisma/client");
const { organisations } = require("./organisations");
const { users } = require("./users");
const { getSubjectData } = require("./subjects");
const { nonComplianceData } = require("./non-complience");
const { playgroundData } = require("./playground");
const { normData } = require("./norm");
const readlineSync = require("readline-sync");
const prisma = new PrismaClient();

const dataAmount = readlineSync.question(
  `
  #### STARTED SEEDING SCRIPT ####

  Select how much subject data to seed:
      1. Minimal
      2. Moderate
      3. Extensive
  Enter your choice (1/2/3):
`,
);

async function main() {
  await dropCollections();

  console.log("Adding organisations...");
  const organisationData = await Promise.all(
    organisations.map(async (org) =>
      prisma.organisation.create({
        data: {
          name: org.name,
          active: true,
          url: org.logoUrl,
        },
      }),
    ),
  );
  const organisationIDs = organisationData.map((org) => org.id);
  const subjectData = getSubjectData(dataAmount, organisationIDs);

  const roles = ["INSPECTOR", "MANAGER", "ADMIN"];

  console.log("Adding users...");
  const userData = await Promise.all(
    users.map(async (user) =>
      prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          active: user.active,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNumber: user.contactNumber,
        },
      }),
    ),
  );

  function getRandomRoles() {
    const roleOptions = [
      [roles[0]],
      [roles[1]],
      [roles[0], roles[2]],
      [roles[1], roles[2]],
      [roles[0], roles[1]],
      [roles[0], roles[1], roles[2]],
    ];
    return roleOptions[Math.floor(Math.random() * roleOptions.length)];
  }

  const organisationUsers = [
    ...organisationData.map((org) => ({
      userId: userData[0].id,
      organisationId: org.id,
      role: getRandomRoles(),
    })),
  ];

  console.log("Adding organisation user relations...");
  await Promise.all(
    organisationUsers.map((orgUser) =>
      prisma.organisationUser.create({
        data: {
          userId: orgUser.userId,
          organisationId: orgUser.organisationId,
          role: orgUser.role,
          active: true,
        },
      }),
    ),
  );

  console.log("Adding subjects...");
  const subjects = [];
  for (const data of subjectData) {
    const subject = await prisma.subject.create({
      data,
    });
    // @ts-expect-error subject is any but subject is never[]
    subjects.push(subject);
  }

  console.log("Adding playgrounds...");
  const playgrounds = [];
  for (let i = 0; i < playgroundData.length; i++) {
    const data = playgroundData[i];
    const subject = subjects[i % subjects.length];
    const playground = await prisma.playground.create({
      data: {
        ...data,
        // @ts-expect-error disable
        subjectId: subject.id,
      },
    });
    // @ts-expect-error disable
    playgrounds.push(playground);
  }

  console.log("Adding norms...");
  const norms = [];
  for (const data of normData) {
    const norm = await prisma.norm.create({
      data,
    });
    // @ts-expect-error disable
    norms.push(norm);
  }

  console.log("Adding non compliance...");
  const nonCompliances = [];
  for (const data of nonComplianceData) {
    const nonCompliance = await prisma.nonCompliance.create({
      data,
    });
    // @ts-expect-error disable
    nonCompliances.push(nonCompliance);
  }

  for (let i = 0; i < norms.length; i++) {
    const norm = norms[i];
    const nonCompliance = nonCompliances[i];

    await prisma.norm.update({
      // @ts-expect-error disable
      where: { id: norm.id },
      data: {
        // @ts-expect-error disable
        nonCompliancesIDs: [nonCompliance.id],
      },
    });

    await prisma.nonCompliance.update({
      // @ts-expect-error disable
      where: { id: nonCompliance.id },
      data: {
        // @ts-expect-error disable
        normIDs: [norm.id],
      },
    });
  }

  console.log("\nSeeding success ✅\n");
  console.log("Don't forget to log out of the application before testing!");
}

main()
  .catch((e) => {
    console.log("\n\nSeeding failed ❌\n\n", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function dropCollections() {
  const collections = await prisma.$runCommandRaw({ listCollections: 1 });

  for (const collection of collections.cursor.firstBatch) {
    if (collection.name.startsWith("system.")) {
      continue;
    }
    await prisma.$runCommandRaw({ drop: collection.name });
    console.log(`Dropped collection: ${collection.name}`);
  }
}
