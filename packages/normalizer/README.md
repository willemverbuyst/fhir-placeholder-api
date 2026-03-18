# Normalizer

## What is this?

This package provides utilities for normalizing FHIR R5 data structures and resources, ensuring consistent shapes and values for downstream processing or integration.

## Example

```ts
 const patient = {
    resourceType: "Patient",
    id: "example",
    identifier: [
      {
        use: "usual",
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
            },
          ],
        },
        system: "urn:oid:1.2.36.146.595.217.0.1",
        value: "12345",
        period: { start: "2001-05-06" },
        assigner: { display: "Acme Healthcare" },
      },
    ],
    active: true,
    name: [
      { use: "official", family: "Chalmers", given: ["Peter", "James"] },
      { use: "usual", given: ["Jim"] },
      {
        use: "maiden",
        family: "Windsor",
        given: ["Peter", "James"],
        period: { end: "2002" },
      },
    ],
    telecom: [
      { use: "home" },
      { system: "phone", value: "(03) 5555 6473", use: "work", rank: 1 },
      { system: "phone", value: "(03) 3410 5613", use: "mobile", rank: 2 },
      {
        system: "phone",
        value: "(03) 5555 8834",
        use: "old",
        period: { end: "2014" },
      },
    ],
    gender: "male",
    birthDate: "1974-12-25",
    _birthDate: {
      extension: [
        {
          url: "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
          valueDateTime: "1974-12-25T14:35:45-05:00",
        },
      ],
    },
    deceasedBoolean: false,
    address: [
      {
        use: "home",
        type: "both",
        text: "534 Erewhon St New York, Rainbow, Vic 3999",
        line: ["534 Erewhon St"],
        city: "New York",
        district: "Rainbow",
        state: "Vic",
        postalCode: "3999",
        period: { start: "1974-12-25" },
      },
    ],
    contact: [
      {
        relationship: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                code: "N",
              },
            ],
          },
        ],
        name: {
          family: "du March",
          _family: {
            extension: [
              {
                url: "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
                valueString: "VV",
              },
            ],
          },
          given: ["Jack"],
        },
        telecom: [{ system: "phone", value: "+33 (237) 998327" }],
        address: {
          use: "home",
          type: "both",
          line: ["534 Erewhon St"],
          city: "New York",
          district: "Rainbow",
          state: "Vic",
          postalCode: "3999",
          period: { start: "1974-12-25" },
        },
        gender: "female",
        period: { start: "2012" },
      },
    ],
    managingOrganization: { reference: "Organization/1" },
  };
```

```ts
    const transformedData = {
      deceasedBoolean: false,
      birthDate: "1974-12-25",
      gender: "male",
      active: true,
      id: "example",
      resourceType: "Patient",
      "text.status": "generated",
      "identifier.0.value": "12345",
      "identifier.0.system": "urn:oid:1.2.36.146.595.217.0.1",
      "identifier.0.use": "usual",
      "identifier.0.type.coding.0.code": "MR",
      "identifier.0.type.coding.0.system":
        "http://terminology.hl7.org/CodeSystem/v2-0203",
      "identifier.0.period.start": "2001-05-06",
      "identifier.0.assigner.display": "Acme Healthcare",
      "name.0.family": "Chalmers",
      "name.0.use": "official",
      "name.0.given.1": "James",
      "name.0.given.0": "Peter",
      "name.1.use": "usual",
      "name.1.given.0": "Jim",
      "name.2.family": "Windsor",
      "name.2.use": "maiden",
      "name.2.given.1": "James",
      "name.2.given.0": "Peter",
      "name.2.period.end": "2002",
      "telecom.0.use": "home",
      "telecom.1.rank": 1,
      "telecom.1.use": "work",
      "telecom.1.value": "(03) 5555 6473",
      "telecom.1.system": "phone",
      "telecom.2.rank": 2,
      "telecom.2.use": "mobile",
      "telecom.2.value": "(03) 3410 5613",
      "telecom.2.system": "phone",
      "telecom.3.use": "old",
      "telecom.3.value": "(03) 5555 8834",
      "telecom.3.system": "phone",
      "telecom.3.period.end": "2014",
      "_birthDate.extension.0.valueDateTime": "1974-12-25T14:35:45-05:00",
      "_birthDate.extension.0.url":
        "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
      "address.0.postalCode": "3999",
      "address.0.state": "Vic",
      "address.0.district": "Rainbow",
      "address.0.city": "New York",
      "address.0.text": "534 Erewhon St New York, Rainbow, Vic 3999",
      "address.0.type": "both",
      "address.0.use": "home",
      "address.0.line.0": "534 Erewhon St",
      "address.0.period.start": "1974-12-25",
      "contact.0.gender": "female",
      "contact.0.relationship.0.coding.0.code": "N",
      "contact.0.relationship.0.coding.0.system":
        "http://terminology.hl7.org/CodeSystem/v2-0131",
      "contact.0.name.family": "du March",
      "contact.0.name._family.extension.0.valueString": "VV",
      "contact.0.name._family.extension.0.url":
        "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
      "contact.0.name.given.0": "Jack",
      "contact.0.telecom.0.value": "+33 (237) 998327",
      "contact.0.telecom.0.system": "phone",
      "contact.0.address.postalCode": "3999",
      "contact.0.address.state": "Vic",
      "contact.0.address.district": "Rainbow",
      "contact.0.address.city": "New York",
      "contact.0.address.type": "both",
      "contact.0.address.use": "home",
      "contact.0.address.line.0": "534 Erewhon St",
      "contact.0.address.period.start": "1974-12-25",
      "contact.0.period.start": "2012",
      "managingOrganization.reference": "Organization/1",
    };

```