const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const collections = await prisma.$runCommandRaw({ listCollections: 1 });

  for (const collection of collections.cursor.firstBatch) {
    if (collection.name.startsWith("system.")) {
      continue;
    }
    await prisma.$runCommandRaw({ drop: collection.name });
    console.log(`Dropped collection: ${collection.name}`);
  }

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

  const subjectData = [
    {
      firstName: "Michael",
      lastName: "Smith",
      address: "123 Maple Street",
      oib: "OIB1234567890",
      phone: "+12345678901",
      email: "michael.smith@example.com",
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      address: "456 Oak Avenue",
      oib: "OIB0987654321",
      phone: "+19876543210",
      email: "emily.johnson@example.com",
    },
    {
      firstName: "William",
      lastName: "Brown",
      address: "789 Pine Road",
      oib: "OIB1122334455",
      phone: "+11223344556",
      email: "william.brown@example.com",
    },
    {
      firstName: "Olivia",
      lastName: "Davis",
      address: "321 Elm Street",
      oib: "OIB2233445566",
      phone: "+12233445567",
      email: "olivia.davis@example.com",
    },
    {
      firstName: "James",
      lastName: "Miller",
      address: "654 Cedar Lane",
      oib: "OIB3344556677",
      phone: "+13344556678",
      email: "james.miller@example.com",
    },
    {
      firstName: "Sophia",
      lastName: "Wilson",
      address: "987 Spruce Court",
      oib: "OIB4455667788",
      phone: "+14455667789",
      email: "sophia.wilson@example.com",
    },
    {
      firstName: "Benjamin",
      lastName: "Moore",
      address: "246 Birch Boulevard",
      oib: "OIB5566778899",
      phone: "+15566778890",
      email: "benjamin.moore@example.com",
    },
    {
      firstName: "Isabella",
      lastName: "Taylor",
      address: "135 Walnut Drive",
      oib: "OIB6677889900",
      phone: "+16677889901",
      email: "isabella.taylor@example.com",
    },
    {
      firstName: "Jacob",
      lastName: "Anderson",
      address: "864 Poplar Street",
      oib: "OIB7788990011",
      phone: "+17788990012",
      email: "jacob.anderson@example.com",
    },
    {
      firstName: "Mia",
      lastName: "Thomas",
      address: "975 Willow Way",
      oib: "OIB8899001122",
      phone: "+18899001123",
      email: "mia.thomas@example.com",
    },
  ];

  console.log("Adding subjects...");
  const subjects = [];
  for (const data of subjectData) {
    const subject = await prisma.subject.create({
      data,
    });
    subjects.push(subject);
  }

  const playgroundData = [
    {
      name: "Central Park Playground",
      type: "EQUIPMENT",
      address: "59th to 110th Street",
      location: "40.785091, -73.968285",
      description: "A large playground with swings and slides.",
      contactPerson: "John Doe",
    },
    {
      name: "Riverside Sports Field",
      type: "SPORT",
      address: "Riverside Dr & W 72nd St",
      location: "40.783060, -73.971249",
      description: "Open field for soccer and baseball.",
      contactPerson: "Jane Smith",
    },
    {
      name: "Lincoln Park Play Area",
      type: "EQUIPMENT",
      address: "2045 N Lincoln Park W",
      location: "41.921438, -87.633773",
      description: "Children's play area with sandbox.",
      contactPerson: "Alex Johnson",
    },
    {
      name: "Beachfront Volleyball Court",
      type: "SPORT",
      address: "Ocean Front Walk",
      location: "34.009242, -118.497604",
      description: "Sandy volleyball courts by the beach.",
      contactPerson: "Maria Garcia",
    },
    {
      name: "Woodland Adventure Playground",
      type: "EQUIPMENT",
      address: "789 Forest Trail",
      location: "37.774929, -122.419416",
      description: "Adventure playground with ropes and climbing.",
      contactPerson: "Robert Martinez",
    },
    {
      name: "City Center Basketball Court",
      type: "SPORT",
      address: "101 City Plaza",
      location: "34.052235, -118.243683",
      description: "Public basketball courts.",
      contactPerson: "Linda Rodriguez",
    },
    {
      name: "Meadowbrook Skate Park",
      type: "EQUIPMENT",
      address: "456 Meadowbrook Lane",
      location: "40.712776, -74.005974",
      description: "Skate park with ramps and rails.",
      contactPerson: "David Lee",
    },
    {
      name: "Sunset Tennis Courts",
      type: "SPORT",
      address: "789 Sunset Blvd",
      location: "34.052235, -118.243683",
      description: "Outdoor tennis courts.",
      contactPerson: "Barbara Wilson",
    },
    {
      name: "Riverbank Climbing Wall",
      type: "EQUIPMENT",
      address: "123 Riverbank Road",
      location: "41.878113, -87.629799",
      description: "Outdoor climbing wall by the river.",
      contactPerson: "Christopher Anderson",
    },
    {
      name: "Hilltop Football Field",
      type: "SPORT",
      address: "321 Hilltop Avenue",
      location: "34.052235, -118.243683",
      description: "Football field with bleachers.",
      contactPerson: "Patricia Thomas",
    },
  ];

  console.log("Adding playgrounds...");
  const playgrounds = [];
  for (let i = 0; i < playgroundData.length; i++) {
    const data = playgroundData[i];
    const subject = subjects[i % subjects.length];
    const playground = await prisma.playground.create({
      data: {
        ...data,
        subjectId: subject.id,
      },
    });
    playgrounds.push(playground);
  }

  const normData = [
    {
      name: "Safety Standards for Playgrounds",
      code: "SSP-001",
      description: "General safety standards for playground equipment.",
    },
    {
      name: "Sport Facility Regulations",
      code: "SFR-002",
      description: "Regulations for maintaining sport facilities.",
    },
    {
      name: "Accessibility Requirements",
      code: "AR-003",
      description: "Standards for accessible playgrounds.",
    },
    {
      name: "Environmental Guidelines",
      code: "EG-004",
      description: "Guidelines for environmentally friendly playgrounds.",
    },
    {
      name: "Equipment Maintenance Procedures",
      code: "EMP-005",
      description: "Procedures for regular equipment maintenance.",
    },
    {
      name: "Emergency Response Plans",
      code: "ERP-006",
      description: "Plans for responding to emergencies at playgrounds.",
    },
    {
      name: "Noise Control Measures",
      code: "NCM-007",
      description: "Measures to control noise levels at play areas.",
    },
    {
      name: "Lighting Standards",
      code: "LS-008",
      description: "Standards for adequate lighting in playgrounds.",
    },
    {
      name: "Surface Material Specifications",
      code: "SMS-009",
      description: "Specifications for safe surface materials.",
    },
    {
      name: "Signage Requirements",
      code: "SR-010",
      description: "Requirements for proper signage in play areas.",
    },
  ];

  console.log("Adding norms...");
  const norms = [];
  for (const data of normData) {
    const norm = await prisma.norm.create({
      data,
    });
    norms.push(norm);
  }

  const nonComplianceData = [
    {
      title: "Lack of Protective Surfacing",
      recommendations: [
        "Install rubber mats",
        "Use wood chips under equipment",
      ],
    },
    {
      title: "Broken Equipment",
      recommendations: ["Repair swings", "Replace broken slides"],
    },
    {
      title: "Inadequate Fencing",
      recommendations: [
        "Install perimeter fencing",
        "Repair damaged fence sections",
      ],
    },
    {
      title: "Poor Lighting",
      recommendations: [
        "Upgrade to LED lights",
        "Install additional light posts",
      ],
    },
    {
      title: "No Safety Signage",
      recommendations: ["Install warning signs", "Provide rules signage"],
    },
    {
      title: "Overgrown Vegetation",
      recommendations: ["Trim trees and bushes", "Remove hazardous plants"],
    },
    {
      title: "Graffiti and Vandalism",
      recommendations: ["Clean graffiti", "Install security cameras"],
    },
    {
      title: "Unsafe Surface Materials",
      recommendations: [
        "Replace asphalt with rubber",
        "Ensure surfaces are level",
      ],
    },
    {
      title: "Obstructed Access Paths",
      recommendations: ["Clear pathways", "Ensure ADA compliance"],
    },
    {
      title: "Inadequate Drainage",
      recommendations: ["Improve drainage systems", "Install gutters"],
    },
  ];

  console.log("Adding non compliance...");
  const nonCompliances = [];
  for (const data of nonComplianceData) {
    const nonCompliance = await prisma.nonCompliance.create({
      data,
    });
    nonCompliances.push(nonCompliance);
  }

  for (let i = 0; i < norms.length; i++) {
    const norm = norms[i];
    const nonCompliance = nonCompliances[i];

    await prisma.norm.update({
      where: { id: norm.id },
      data: {
        nonCompliancesIDs: [nonCompliance.id],
      },
    });

    await prisma.nonCompliance.update({
      where: { id: nonCompliance.id },
      data: {
        normIDs: [norm.id],
      },
    });
  }

  console.log("\nSeeding success ✅\n");
}

main()
  .catch((e) => {
    console.log("\n\nSeeding failed ❌\n\n", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
