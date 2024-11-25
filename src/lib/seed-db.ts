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
      name: "GreenMeadow Playgrounds d.o.o.",
      address: "123 Maple Street",
      oib: "1234567890",
      contact: "+12345678901",
      email: "info@greenmeadowplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "SunnyTrail Parks Ltd.",
      address: "456 Oak Avenue",
      oib: "0987654321",
      contact: "+19876543210",
      email: "contact@sunnytrailparks.com",
      country: "Croatia",
    },
    {
      name: "AdventureHaven Parks Inc.",
      address: "789 Pine Road",
      oib: "1122334455",
      contact: "+11223344556",
      email: "support@adventurehavenparks.com",
      country: "Croatia",
    },
    {
      name: "LittleSprouts Playgrounds d.o.o.",
      address: "321 Elm Street",
      oib: "2233445566",
      contact: "+12233445567",
      email: "info@littlesproutsplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "WillowWonderland Parks Ltd.",
      address: "654 Cedar Lane",
      oib: "3344556677",
      contact: "+13344556678",
      email: "hello@willowwonderlandparks.com",
      country: "Croatia",
    },
    {
      name: "HappyPines Playgrounds Inc.",
      address: "987 Spruce Court",
      oib: "4455667788",
      contact: "+14455667789",
      email: "contact@happypinesplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "SafeNest Playgrounds d.o.o.",
      address: "246 Birch Boulevard",
      oib: "5566778899",
      contact: "+15566778890",
      email: "info@safenestplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "RainbowFields Parks Ltd.",
      address: "135 Walnut Drive",
      oib: "6677889900",
      contact: "+16677889901",
      email: "support@rainbowfieldsparks.com",
      country: "Croatia",
    },
    {
      name: "Parkside Adventures Inc.",
      address: "864 Poplar Street",
      oib: "7788990011",
      contact: "+17788990012",
      email: "info@parksideadventures.com",
      country: "Croatia",
    },
    {
      name: "WonderWood Parks d.o.o.",
      address: "975 Willow Way",
      oib: "8899001122",
      contact: "+18899001123",
      email: "contact@wonderwoodparks.com",
      country: "Germany",
    },
    {
      name: "Playground Netherlands d.o.o.",
      address: "Ilica 23a",
      oib: "1129208192",
      contact: "+385989033831",
      email: "info@playgroundcroatia.com",
      country: "Netherlands",
    },
    {
      name: "MeadowSprings Playgrounds Ltd.",
      address: "Graica 7c",
      oib: "1199805511",
      contact: "+38598191828",
      email: "hello@meadowspringsplaygrounds.com",
      country: "Germany",
    },
    {
      name: "Oakwood Parks Ltd.",
      address: "55 Forest Lane",
      oib: "9900112233",
      contact: "+19900112233",
      email: "info@oakwoodparks.com",
      country: "Croatia",
    },
    {
      name: "PineValley Playgrounds Inc.",
      address: "47 Evergreen Road",
      oib: "8800223344",
      contact: "+18800223344",
      email: "support@pinevalleyplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "RiverBend Playgrounds Ltd.",
      address: "102 Riverside Drive",
      oib: "7700334455",
      contact: "+17700334455",
      email: "contact@riverbendplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "HorizonPlay Parks Inc.",
      address: "22 Horizon Avenue",
      oib: "6600445566",
      contact: "+16600445566",
      email: "info@horizonplayparks.com",
      country: "Germany",
    },
    {
      name: "MountainView Playgrounds d.o.o.",
      address: "33 Summit Drive",
      oib: "5500556677",
      contact: "+15500556677",
      email: "hello@mountainviewplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "GoldenFields Playgrounds Ltd.",
      address: "88 Meadow Road",
      oib: "4400667788",
      contact: "+14400667788",
      email: "info@goldenfieldsplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "Skyline Parks Inc.",
      address: "99 Skyline Boulevard",
      oib: "3300778899",
      contact: "+13300778899",
      email: "support@skylineparks.com",
      country: "Netherlands",
    },
    {
      name: "Sunrise Parks d.o.o.",
      address: "14 Morning Street",
      oib: "2200889900",
      contact: "+12200889900",
      email: "contact@sunriseparks.com",
      country: "Croatia",
    },
    {
      name: "HarvestParks Playgrounds Ltd.",
      address: "70 Orchard Lane",
      oib: "1100990011",
      contact: "+11100990011",
      email: "info@harvestparks.com",
      country: "Croatia",
    },
    {
      name: "SilverCreek Playgrounds Inc.",
      address: "45 Silver Street",
      oib: "0099001122",
      contact: "+10099001122",
      email: "info@silvercreekplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "Evergreen Playgrounds Ltd.",
      address: "12 Willow Grove",
      oib: "1010101010",
      contact: "+12345067890",
      email: "contact@evergreenplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "BlueSky Parks d.o.o.",
      address: "34 Horizon Lane",
      oib: "2020202020",
      contact: "+19876234567",
      email: "info@blueskyparks.com",
      country: "Croatia",
    },
    {
      name: "NatureNest Playgrounds Inc.",
      address: "98 Aspen Drive",
      oib: "3030303030",
      contact: "+11234567890",
      email: "support@naturenestplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "HappySprings Parks Ltd.",
      address: "57 Birch Hill",
      oib: "4040404040",
      contact: "+12233456789",
      email: "hello@happyspringsparks.com",
      country: "Germany",
    },
    {
      name: "GoldenMeadow Playgrounds d.o.o.",
      address: "79 Pine View",
      oib: "5050505050",
      contact: "+14455678901",
      email: "contact@goldenmeadowplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "ClearWater Parks Ltd.",
      address: "42 Crystal Lane",
      oib: "6060606060",
      contact: "+13344556678",
      email: "info@clearwaterparks.com",
      country: "Netherlands",
    },
    {
      name: "OakHaven Playgrounds Inc.",
      address: "81 Elm Ridge",
      oib: "7070707070",
      contact: "+16677889901",
      email: "support@oakhavenplaygrounds.com",
      country: "Croatia",
    },
    {
      name: "StarGrove Parks Ltd.",
      address: "90 Forest Trail",
      oib: "8080808080",
      contact: "+17788990012",
      email: "info@stargroveparks.com",
      country: "Germany",
    },
    {
      name: "MeadowView Playgrounds Inc.",
      address: "29 Sunset Road",
      oib: "9090909090",
      contact: "+18899001123",
      email: "hello@meadowviewplaygrounds.com",
      country: "Germany",
    },
    {
      name: "RiverEdge Playgrounds d.o.o.",
      address: "18 Riverbend Way",
      oib: "1011121314",
      contact: "+385981912345",
      email: "contact@riveredgeplaygrounds.com",
      country: "Germany",
    },
    {
      name: "SunnyVale Parks Ltd.",
      address: "73 Sunrise Avenue",
      oib: "1516171819",
      contact: "+385981234567",
      email: "info@sunnyvaleparks.com",
      country: "Netherlands",
    },
    {
      name: "HarmonyFields Playgrounds d.o.o.",
      address: "36 Oakfield Drive",
      oib: "2021222324",
      contact: "+385981111111",
      email: "hello@harmonyfieldsplaygrounds.com",
      country: "Germany",
    },
    {
      name: "Lakeside Parks Ltd.",
      address: "85 Lakeshore Boulevard",
      oib: "2526272829",
      contact: "+385981000000",
      email: "info@lakesideparks.com",
      country: "Germany",
    },
    {
      name: "BrightHorizons Playgrounds Inc.",
      address: "64 Ridgewood Lane",
      oib: "3031323334",
      contact: "+385981223344",
      email: "support@brighthorizonsplaygrounds.com",
      country: "Germany",
    },
    {
      name: "TimberTrail Parks Ltd.",
      address: "48 Woodland Path",
      oib: "3536373839",
      contact: "+385981334455",
      email: "contact@timbertrailparks.com",
      country: "Germany",
    },
    {
      name: "MorningGlow Playgrounds Inc.",
      address: "91 Sunrise Court",
      oib: "4041424344",
      contact: "+385981445566",
      email: "info@morningglowplaygrounds.com",
      country: "Germany",
    },
    {
      name: "CedarPoint Parks Ltd.",
      address: "72 Cedar Avenue",
      oib: "4546474849",
      contact: "+385981556677",
      email: "hello@cedarpointparks.com",
      country: "Germany",
    },
    {
      name: "SilverBirch Playgrounds d.o.o.",
      address: "33 Birchwood Drive",
      oib: "5051525354",
      contact: "+385981667788",
      email: "info@silverbirchplaygrounds.com",
      country: "Netherlands",
    },
    {
      name: "Trailblazer Parks Inc.",
      address: "27 Mountain Road",
      oib: "5556575859",
      contact: "+385981778899",
      email: "contact@trailblazerparks.com",
      country: "Germany",
    },
    {
      name: "AspenCreek Playgrounds Ltd.",
      address: "19 Aspen Way",
      oib: "6061626364",
      contact: "+385981889900",
      email: "support@aspencreekplaygrounds.com",
      country: "Germany",
    },
  ];

  console.log("Adding subjects...");
  const subjects = [];
  for (const data of subjectData) {
    const subject = await prisma.subject.create({
      data,
    });
    // @ts-expect-error subject is any but subject is never[]
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
        // @ts-expect-error disable
        subjectId: subject.id,
      },
    });
    // @ts-expect-error disable
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
    // @ts-expect-error disable
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
}

main()
  .catch((e) => {
    console.log("\n\nSeeding failed ❌\n\n", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
