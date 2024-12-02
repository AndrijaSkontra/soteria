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
      country: getRandomItem(getCountries()).value,
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

function getCountries() {
  return [
    { value: "Albania", label: "AL" },
    { value: "Andorra", label: "AD" },
    { value: "Armenia", label: "AM" },
    { value: "Austria", label: "AT" },
    { value: "Azerbaijan", label: "AZ" },
    { value: "Belarus", label: "BY" },
    { value: "Belgium", label: "BE" },
    { value: "Bosnia and Herzegovina", label: "BA" },
    { value: "Bulgaria", label: "BG" },
    { value: "Croatia", label: "HR" },
    { value: "Cyprus", label: "CY" },
    { value: "Czech Republic", label: "CZ" },
    { value: "Denmark", label: "DK" },
    { value: "Estonia", label: "EE" },
    { value: "Finland", label: "FI" },
    { value: "France", label: "FR" },
    { value: "Georgia", label: "GE" },
    { value: "Germany", label: "DE" },
    { value: "Greece", label: "GR" },
    { value: "Hungary", label: "HU" },
    { value: "Iceland", label: "IS" },
    { value: "Ireland", label: "IE" },
    { value: "Italy", label: "IT" },
    { value: "Kazakhstan", label: "KZ" },
    { value: "Kosovo", label: "XK" },
    { value: "Latvia", label: "LV" },
    { value: "Liechtenstein", label: "LI" },
    { value: "Lithuania", label: "LT" },
    { value: "Luxembourg", label: "LU" },
    { value: "Malta", label: "MT" },
    { value: "Moldova", label: "MD" },
    { value: "Monaco", label: "MC" },
    { value: "Montenegro", label: "ME" },
    { value: "Netherlands", label: "NL" },
    { value: "North Macedonia", label: "MK" },
    { value: "Norway", label: "NO" },
    { value: "Poland", label: "PL" },
    { value: "Portugal", label: "PT" },
    { value: "Romania", label: "RO" },
    { value: "Russia", label: "RU" },
    { value: "San Marino", label: "SM" },
    { value: "Serbia", label: "RS" },
    { value: "Slovakia", label: "SK" },
    { value: "Slovenia", label: "SI" },
    { value: "Spain", label: "ES" },
    { value: "Sweden", label: "SE" },
    { value: "Switzerland", label: "CH" },
    { value: "Turkey", label: "TR" },
    { value: "Ukraine", label: "UA" },
    { value: "United Kingdom", label: "UK" },
    { value: "Vatican City", label: "VA" },
  ];
}
