const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const organisations = [
    {
      name: "Apple",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Google",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
    },
    {
      name: "Microsoft",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/640px-Microsoft_logo_%282012%29.svg.png",
    },
    {
      name: "Amazon",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Facebook",
      logoUrl:
        "https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo-2015-present.jpg",
    },
    {
      name: "Tesla",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Tesla%2C_Inc._-_Logo_%28black_script_version%29.svg/640px-Tesla%2C_Inc._-_Logo_%28black_script_version%29.svg.png",
    },
    {
      name: "IBM",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Intel",
      logoUrl:
        "https://logowik.com/content/uploads/images/intel-2020-new3327.jpg",
    },
    {
      name: "Cisco",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/640px-Cisco_logo_blue_2016.svg.png",
    },
    {
      name: "Oracle",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
  ];

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

  const roles = ["INSPECTOR", "MANAGER", "ADMIN"];

  const users = [
    {
      email: "john.doe@example.com",
      password: "password123",
      active: true,
      firstName: "John",
      lastName: "Doe",
      contactNumber: "385 12 345 6789",
    },
    {
      email: "jane.smith@example.com",
      password: "password123",
      active: true,
      firstName: "Jane",
      lastName: "Smith",
      contactNumber: "385 12 345 6789",
    },
    {
      email: "emma.jones@example.com",
      password: "password123",
      active: true,
      firstName: "Emma",
      lastName: "Jones",
      contactNumber: "385 12 345 6789",
    },
    {
      email: "william.brown@example.com",
      password: "password123",
      active: true,
      firstName: "William",
      lastName: "Brown",
      contactNumber: "385 12 345 6789",
    },
    {
      email: "mile.radic@gmail.com",
      password: "password123",
      active: true,
      firstName: "Mile",
      lastName: "Radic",
      contactNumber: "385 12 345 6789",
    },
  ];

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

    {
      userId: userData[1].id,
      organisationId: organisationData[0].id,
      role: [roles[0]],
    },
    {
      userId: userData[1].id,
      organisationId: organisationData[1].id,
      role: [roles[1]],
    },
    {
      userId: userData[1].id,
      organisationId: organisationData[2].id,
      role: [roles[0], roles[1]],
    },

    {
      userId: userData[2].id,
      organisationId: organisationData[3].id,
      role: [roles[1]],
    },
    {
      userId: userData[2].id,
      organisationId: organisationData[4].id,
      role: [roles[0]],
    },
    {
      userId: userData[2].id,
      organisationId: organisationData[5].id,
      role: [roles[0], roles[1]],
    },
  ];

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

  console.log("✔ seeding success✔\n");
}

main()
  .catch((e) => {
    console.log("\n\n❌ seeding failed ❌\n\n", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
