const { faker } = require("@faker-js/faker");

function generateSubjects(amount) {
  const subjects = [];

  for (let i = 0; i < amount; i++) {
    const name = faker.company.name();
    subjects.push({
      name: name,
      address: faker.location.streetAddress(),
      oib: String(faker.number.int({ min: 100000000, max: 990000000 })),
      contact: String(faker.number.int({ min: 90000000, max: 99000000 })),
      email: `${name}.company@example.com`,
      country: faker.location.country(),
    });
  }

  return subjects;
}

function getSubjectData(input) {
  let subjectData;

  switch (input) {
    case "1":
      subjectData = generateSubjects(3);
      break;
    case "2":
      subjectData = generateSubjects(39);
      break;
    case "3":
      subjectData = generateSubjects(89);
      break;
    default:
      subjectData = generateSubjects(52);
  }

  return subjectData;
}

module.exports = { getSubjectData };
