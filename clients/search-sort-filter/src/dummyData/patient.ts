import { Patient } from "fhir/r5";

export const patients: (Patient & { id: string })[] = [
  {
    id: "patient-1",
    name: [{ family: "Thompson", given: ["Aniya"] }],
    resourceType: "Patient",
    birthDate: "1973-03-27",
    gender: "female",
    active: false,
    telecom: [
      {
        use: "work",
        system: "email",
        value: "Aniya_Thompson@fhir-placeholder.api",
      },
      { use: "old", system: "phone", value: "(615) 884-5450" },
    ],
    address: [
      {
        use: "work",
        type: "both",
        line: ["91094 St George's Road"],
        city: "Chandler",
        state: "Delaware",
        postalCode: "70358",
        country: "Mayotte",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-1" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "cs-CZ",
              system: "urn:ietf:bcp:47",
              display: "Czech (Czechia)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-2",
    name: [{ family: "Beahan", given: ["Ora"] }],
    resourceType: "Patient",
    birthDate: "1952-04-01",
    gender: "male",
    active: false,
    telecom: [
      {
        use: "mobile",
        system: "email",
        value: "Ora.Beahan42@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(903) 930-1638" },
    ],
    address: [
      {
        use: "old",
        type: "postal",
        line: ["184 Jeffry Station"],
        city: "West Josephinefield",
        state: "Hawaii",
        postalCode: "10414",
        country: "Israel",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-1" }],
    communication: [
      {
        language: {
          coding: [
            { code: "bs", system: "urn:ietf:bcp:47", display: "Bosnian" },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-3",
    name: [{ family: "Rowe", given: ["Savannah"] }],
    resourceType: "Patient",
    birthDate: "1952-03-25",
    gender: "male",
    active: false,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Savannah_Rowe@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(792) 720-5927" },
    ],
    address: [
      {
        use: "home",
        type: "physical",
        line: ["570 Alden Rapid"],
        city: "Lake Israel",
        state: "Arkansas",
        postalCode: "10830",
        country: "Togo",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-1" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "fr-BE",
              system: "urn:ietf:bcp:47",
              display: "French (Belgium)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-4",
    name: [{ family: "Murazik", given: ["Rebeca"] }],
    resourceType: "Patient",
    birthDate: "2001-03-31",
    gender: "unknown",
    active: false,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Rebeca.Murazik39@fhir-placeholder.api",
      },
      { use: "old", system: "phone", value: "(764) 240-5106" },
    ],
    address: [
      {
        use: "old",
        type: "both",
        line: ["429 Schumm Key"],
        city: "Anaheim",
        state: "Rhode Island",
        postalCode: "51116",
        country: "Philippines",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-1" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "ro-RO",
              system: "urn:ietf:bcp:47",
              display: "Romanian (Romania)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-5",
    name: [{ family: "Hayes", given: ["Rosie"] }],
    resourceType: "Patient",
    birthDate: "2004-05-15",
    gender: "female",
    active: false,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Rosie.Hayes16@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(428) 663-4090" },
    ],
    address: [
      {
        use: "billing",
        type: "physical",
        line: ["6183 Crona Ways"],
        city: "New Dawnland",
        state: "Alaska",
        postalCode: "30139",
        country: "Namibia",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-2" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "nl-BE",
              system: "urn:ietf:bcp:47",
              display: "Dutch (Belgium)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-6",
    name: [{ family: "Friesen-Huels", given: ["Jedediah"] }],
    resourceType: "Patient",
    birthDate: "1985-11-30",
    gender: "female",
    active: false,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Jedediah.Friesen-Huels@fhir-placeholder.api",
      },
      { use: "temp", system: "phone", value: "(326) 214-1300" },
    ],
    address: [
      {
        use: "temp",
        type: "postal",
        line: ["5875 Conroy Forks"],
        city: "Legrosmouth",
        state: "Mississippi",
        postalCode: "41177",
        country: "Cook Islands",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-2" }],
    communication: [
      {
        language: {
          coding: [{ code: "nl", system: "urn:ietf:bcp:47", display: "Dutch" }],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-7",
    name: [{ family: "Rau", given: ["Clara"] }],
    resourceType: "Patient",
    birthDate: "1979-04-30",
    gender: "unknown",
    active: false,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Clara_Rau5@fhir-placeholder.api",
      },
      { use: "temp", system: "phone", value: "(839) 295-8326" },
    ],
    address: [
      {
        use: "home",
        type: "postal",
        line: ["74601 Destini Lock"],
        city: "Lake Joannyport",
        state: "New Mexico",
        postalCode: "52787-4487",
        country: "Somalia",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-2" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "fr-CA",
              system: "urn:ietf:bcp:47",
              display: "French (Canada)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-8",
    name: [{ family: "Block", given: ["Tressie"] }],
    resourceType: "Patient",
    birthDate: "1998-06-04",
    gender: "female",
    active: false,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Tressie_Block8@fhir-placeholder.api",
      },
      { use: "temp", system: "phone", value: "(371) 294-9312" },
    ],
    address: [
      {
        use: "billing",
        type: "postal",
        line: ["8579 Kunde Hollow"],
        city: "Franciscashire",
        state: "Louisiana",
        postalCode: "41964",
        country: "Mali",
      },
    ],
    managingOrganization: { reference: "Organization/organization-1" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-2" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "de-AT",
              system: "urn:ietf:bcp:47",
              display: "German (Austria)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-9",
    name: [{ family: "Langworth", given: ["Trevion"] }],
    resourceType: "Patient",
    birthDate: "2011-09-15",
    gender: "male",
    active: false,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Trevion_Langworth@fhir-placeholder.api",
      },
      { use: "old", system: "phone", value: "(795) 617-1984" },
    ],
    address: [
      {
        use: "home",
        type: "physical",
        line: ["5209 Katrina Mall"],
        city: "Malden",
        state: "Wyoming",
        postalCode: "57618",
        country: "Colombia",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-3" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "nl-BE",
              system: "urn:ietf:bcp:47",
              display: "Dutch (Belgium)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-10",
    name: [{ family: "Nienow", given: ["Ryder"] }],
    resourceType: "Patient",
    birthDate: "1952-05-11",
    gender: "other",
    active: true,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Ryder_Nienow@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(654) 788-0867" },
    ],
    address: [
      {
        use: "home",
        type: "physical",
        line: ["75015 Goodwin Motorway"],
        city: "Strackeside",
        state: "Kansas",
        postalCode: "66348",
        country: "Democratic Republic of the Congo",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-3" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "nl-NL",
              system: "urn:ietf:bcp:47",
              display: "Dutch (Netherlands)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-11",
    name: [{ family: "Hegmann", given: ["Eliezer"] }],
    resourceType: "Patient",
    birthDate: "1981-01-24",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Eliezer_Hegmann3@fhir-placeholder.api",
      },
      { use: "home", system: "phone", value: "(834) 458-5473" },
    ],
    address: [
      {
        use: "temp",
        type: "both",
        line: ["825 Vicky Point"],
        city: "Palm Harbor",
        state: "Mississippi",
        postalCode: "49637-6207",
        country: "Uruguay",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-3" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "bs-BA",
              system: "urn:ietf:bcp:47",
              display: "Bosnian (Bosnia and Herzegovina))",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-12",
    name: [{ family: "Stamm", given: ["Davion"] }],
    resourceType: "Patient",
    birthDate: "1990-10-29",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "mobile",
        system: "email",
        value: "Davion_Stamm99@fhir-placeholder.api",
      },
      { use: "old", system: "phone", value: "(833) 798-1610" },
    ],
    address: [
      {
        use: "home",
        type: "postal",
        line: ["7175 Shyanne Plain"],
        city: "Port Isaacboro",
        state: "Indiana",
        postalCode: "84210-1135",
        country: "Cameroon",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-3" }],
    communication: [
      {
        language: {
          coding: [
            { code: "sv", system: "urn:ietf:bcp:47", display: "Swedish" },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-13",
    name: [{ family: "Grimes", given: ["Antonetta"] }],
    resourceType: "Patient",
    birthDate: "1976-07-18",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "old",
        system: "email",
        value: "Antonetta.Grimes38@fhir-placeholder.api",
      },
      { use: "temp", system: "phone", value: "(229) 503-0119" },
    ],
    address: [
      {
        use: "temp",
        type: "postal",
        line: ["6118 South View"],
        city: "Dibbertfurt",
        state: "Massachusetts",
        postalCode: "21600-9290",
        country: "Marshall Islands",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-4" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "ro-RO",
              system: "urn:ietf:bcp:47",
              display: "Romanian (Romania)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-14",
    name: [{ family: "Langworth", given: ["Eda"] }],
    resourceType: "Patient",
    birthDate: "2014-10-10",
    gender: "male",
    active: true,
    telecom: [
      {
        use: "mobile",
        system: "email",
        value: "Eda_Langworth61@fhir-placeholder.api",
      },
      { use: "work", system: "phone", value: "(884) 727-3112" },
    ],
    address: [
      {
        use: "billing",
        type: "physical",
        line: ["318 Water Lane"],
        city: "South Leilaniland",
        state: "Massachusetts",
        postalCode: "50336",
        country: "Suriname",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-4" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "it-CH",
              system: "urn:ietf:bcp:47",
              display: "Italian (Switzerland)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-15",
    name: [{ family: "Leannon", given: ["Jensen"] }],
    resourceType: "Patient",
    birthDate: "1962-11-01",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "old",
        system: "email",
        value: "Jensen.Leannon24@fhir-placeholder.api",
      },
      { use: "work", system: "phone", value: "(553) 548-5608" },
    ],
    address: [
      {
        use: "work",
        type: "physical",
        line: ["448 Kyle Spur"],
        city: "Medhurstview",
        state: "Mississippi",
        postalCode: "53720",
        country: "Belize",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-4" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "el-GR",
              system: "urn:ietf:bcp:47",
              display: "Greek (Greece)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-16",
    name: [{ family: "Braun", given: ["Colt"] }],
    resourceType: "Patient",
    birthDate: "1971-05-21",
    gender: "female",
    active: true,
    telecom: [
      {
        use: "temp",
        system: "email",
        value: "Colt.Braun@fhir-placeholder.api",
      },
      { use: "work", system: "phone", value: "(200) 714-7443" },
    ],
    address: [
      {
        use: "old",
        type: "postal",
        line: ["519 Caleigh Row"],
        city: "Bakersfield",
        state: "Utah",
        postalCode: "53186-3795",
        country: "Cook Islands",
      },
    ],
    managingOrganization: { reference: "Organization/organization-2" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-4" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "fr-CH",
              system: "urn:ietf:bcp:47",
              display: "French (Switzerland)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-17",
    name: [{ family: "Kerluke", given: ["Elyse"] }],
    resourceType: "Patient",
    birthDate: "1970-05-29",
    gender: "female",
    active: true,
    telecom: [
      {
        use: "work",
        system: "email",
        value: "Elyse.Kerluke79@fhir-placeholder.api",
      },
      { use: "old", system: "phone", value: "(506) 764-7609" },
    ],
    address: [
      {
        use: "temp",
        type: "both",
        line: ["8914 W North Street"],
        city: "Hilllview",
        state: "Utah",
        postalCode: "28495-4287",
        country: "Lebanon",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-5" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "sl-SI",
              system: "urn:ietf:bcp:47",
              display: "Slovenian (Slovenia)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-18",
    name: [{ family: "Aufderhar", given: ["Allie"] }],
    resourceType: "Patient",
    birthDate: "1968-12-29",
    gender: "male",
    active: true,
    telecom: [
      {
        use: "old",
        system: "email",
        value: "Allie.Aufderhar@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(222) 333-6929" },
    ],
    address: [
      {
        use: "old",
        type: "physical",
        line: ["4154 Schmitt Oval"],
        city: "Greenfelderstead",
        state: "South Dakota",
        postalCode: "01105-1702",
        country: "Tuvalu",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-5" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "lt-LT",
              system: "urn:ietf:bcp:47",
              display: "Lithuanian (Lithuania)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-19",
    name: [{ family: "Ruecker", given: ["Rose"] }],
    resourceType: "Patient",
    birthDate: "1967-10-18",
    gender: "other",
    active: true,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Rose.Ruecker@fhir-placeholder.api",
      },
      { use: "home", system: "phone", value: "(375) 693-6850" },
    ],
    address: [
      {
        use: "temp",
        type: "postal",
        line: ["2948 Lowe Trafficway"],
        city: "Fannyshire",
        state: "North Dakota",
        postalCode: "02765-8577",
        country: "Bermuda",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-5" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "en-US",
              system: "urn:ietf:bcp:47",
              display: "English (United States)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-20",
    name: [{ family: "Goodwin", given: ["Jakob"] }],
    resourceType: "Patient",
    birthDate: "1960-05-21",
    gender: "female",
    active: true,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Jakob.Goodwin@fhir-placeholder.api",
      },
      { use: "work", system: "phone", value: "(788) 360-7050" },
    ],
    address: [
      {
        use: "old",
        type: "postal",
        line: ["84547 Castle Road"],
        city: "Angelinatown",
        state: "Illinois",
        postalCode: "88034-6739",
        country: "Northern Mariana Islands",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-5" }],
    communication: [
      {
        language: {
          coding: [
            { code: "ja", system: "urn:ietf:bcp:47", display: "Japanese" },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-21",
    name: [{ family: "MacGyver", given: ["Candida"] }],
    resourceType: "Patient",
    birthDate: "2005-04-05",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Candida_MacGyver77@fhir-placeholder.api",
      },
      { use: "work", system: "phone", value: "(880) 939-6695" },
    ],
    address: [
      {
        use: "home",
        type: "physical",
        line: ["128 Quitzon Mission"],
        city: "West Hartford",
        state: "Rhode Island",
        postalCode: "89733",
        country: "Virgin Islands, U.S.",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-6" }],
    communication: [
      {
        language: {
          coding: [
            { code: "sr", system: "urn:ietf:bcp:47", display: "Serbian" },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-22",
    name: [{ family: "Waters", given: ["Isaiah"] }],
    resourceType: "Patient",
    birthDate: "1994-03-19",
    gender: "other",
    active: true,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Isaiah_Waters@fhir-placeholder.api",
      },
      { use: "home", system: "phone", value: "(275) 371-3390" },
    ],
    address: [
      {
        use: "old",
        type: "postal",
        line: ["669 Dee Circles"],
        city: "Eraton",
        state: "New Jersey",
        postalCode: "55030-7564",
        country: "Nauru",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-6" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "et-EE",
              system: "urn:ietf:bcp:47",
              display: "Estonian (Estonia)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-23",
    name: [{ family: "Schimmel", given: ["Roberta"] }],
    resourceType: "Patient",
    birthDate: "1976-10-06",
    gender: "male",
    active: true,
    telecom: [
      {
        use: "work",
        system: "email",
        value: "Roberta_Schimmel@fhir-placeholder.api",
      },
      { use: "mobile", system: "phone", value: "(878) 855-7691" },
    ],
    address: [
      {
        use: "work",
        type: "postal",
        line: ["47871 Hagenes Crescent"],
        city: "Kochtown",
        state: "California",
        postalCode: "08892",
        country: "Nigeria",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-6" }],
    communication: [
      {
        language: {
          coding: [
            {
              code: "sv-SE",
              system: "urn:ietf:bcp:47",
              display: "Swedish (Sweden)",
            },
          ],
        },
        preferred: true,
      },
    ],
  },
  {
    id: "patient-24",
    name: [{ family: "Konopelski", given: ["Eugene"] }],
    resourceType: "Patient",
    birthDate: "1967-04-22",
    gender: "unknown",
    active: true,
    telecom: [
      {
        use: "home",
        system: "email",
        value: "Eugene_Konopelski@fhir-placeholder.api",
      },
      { use: "temp", system: "phone", value: "(781) 821-3980" },
    ],
    address: [
      {
        use: "billing",
        type: "both",
        line: ["6832 Mariela Forges"],
        city: "Weissnatboro",
        state: "Louisiana",
        postalCode: "73782",
        country: "Malawi",
      },
    ],
    managingOrganization: { reference: "Organization/organization-3" },
    generalPractitioner: [{ reference: "Practitioner/practitioner-6" }],
    communication: [
      {
        language: {
          coding: [
            { code: "ar", system: "urn:ietf:bcp:47", display: "Arabisk" },
          ],
        },
        preferred: true,
      },
    ],
  },
];
