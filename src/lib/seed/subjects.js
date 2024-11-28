const { faker } = require("@faker-js/faker");

function generateSubjects(amount, organisationIDs) {
  const subjects = [];

  for (let i = 0; i < amount; i++) {
    const name = faker.company.name();
    subjects.push({
      name: name,
      address: faker.location.streetAddress(),
      oib: String(faker.number.int({ min: 100000000, max: 990000000 })),
      contact: String(faker.number.int({ min: 90000000, max: 99000000 })),
      email: `${name.slice(0, 6).replace(/[^a-zA-Z]/g, "")}.company@example.com`,
      country: faker.location.country(),
      organisationId: getRandomItem(organisationIDs),
    });
  }

  return subjects;
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSubjectData(input, organisationIDs) {
  let subjectData;

  switch (input) {
    case "1":
      subjectData = generateSubjects(3, organisationIDs);
      break;
    case "2":
      subjectData = generateSubjects(39, organisationIDs);
      break;
    case "3":
      subjectData = generateSubjects(256, organisationIDs);
      break;
    default:
      subjectData = generateSubjects(52, organisationIDs);
  }

  return subjectData;
}

module.exports = { getSubjectData };
