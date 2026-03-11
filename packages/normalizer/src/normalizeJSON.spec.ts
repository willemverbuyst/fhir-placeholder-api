import { describe, expect, it } from "vitest";
import { normalizeJSON } from "./normalizeJSON";

describe("normalizeJSON", () => {
  const patientExample = {
    resourceType: "Patient",
    id: "example",
    text: {
      status: "generated",
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345\u00a0(use:\u00a0USUAL,\u00a0period:\u00a02001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
    },
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
        text: "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
        line: ["534 Erewhon St"],
        city: "PleasantVille",
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
          family: "du Marché",
          _family: {
            extension: [
              {
                url: "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
                valueString: "VV",
              },
            ],
          },
          given: ["Bénédicte"],
        },
        telecom: [{ system: "phone", value: "+33 (237) 998327" }],
        address: {
          use: "home",
          type: "both",
          line: ["534 Erewhon St"],
          city: "PleasantVille",
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

  it("should normalize a JSON object", () => {
    const normalized = normalizeJSON(patientExample);
    const expected = {
      deceasedBoolean: false,
      birthDate: "1974-12-25",
      gender: "male",
      active: true,
      id: "example",
      resourceType: "Patient",
      "text.div":
        '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345 (use: USUAL, period: 2001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
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
      "address.0.city": "PleasantVille",
      "address.0.text": "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
      "address.0.type": "both",
      "address.0.use": "home",
      "address.0.line.0": "534 Erewhon St",
      "address.0.period.start": "1974-12-25",
      "contact.0.gender": "female",
      "contact.0.relationship.0.coding.0.code": "N",
      "contact.0.relationship.0.coding.0.system":
        "http://terminology.hl7.org/CodeSystem/v2-0131",
      "contact.0.name.family": "du Marché",
      "contact.0.name._family.extension.0.valueString": "VV",
      "contact.0.name._family.extension.0.url":
        "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
      "contact.0.name.given.0": "Bénédicte",
      "contact.0.telecom.0.value": "+33 (237) 998327",
      "contact.0.telecom.0.system": "phone",
      "contact.0.address.postalCode": "3999",
      "contact.0.address.state": "Vic",
      "contact.0.address.district": "Rainbow",
      "contact.0.address.city": "PleasantVille",
      "contact.0.address.type": "both",
      "contact.0.address.use": "home",
      "contact.0.address.line.0": "534 Erewhon St",
      "contact.0.address.period.start": "1974-12-25",
      "contact.0.period.start": "2012",
      "managingOrganization.reference": "Organization/1",
    };

    expect(normalized).toEqual(expected);
  });

  it("should throw an error if the data is not a object or array", () => {
    expect(() => normalizeJSON("not an object or array")).toThrow(
      "Data must be a object or array",
    );
    expect(() => normalizeJSON(123)).toThrow("Data must be a object or array");
    expect(() => normalizeJSON(true)).toThrow("Data must be a object or array");
    expect(() => normalizeJSON(undefined)).toThrow(
      "Data must be a object or array",
    );
    expect(() => normalizeJSON(null)).toThrow("Data must be a object or array");
  });

  it("should normalize a JSON array", () => {
    const arr = [
      {
        name: "John",
        age: 30,
        address: { city: "New York", state: "NY" },
        telecom: [
          { value: "+1 (212) 555-1234", system: "phone" },
          { value: "john.doe@example.com", system: "email" },
        ],
      },
      {
        name: "Jane",
        age: 25,
        address: { city: "Los Angeles", state: "CA" },
        telecom: [{ value: "jane.doe@example.com", system: "email" }],
      },
    ];
    const normalized = normalizeJSON(arr);
    expect(normalized).toEqual({
      "0.name": "John",
      "0.age": 30,
      "0.address.city": "New York",
      "0.address.state": "NY",
      "0.telecom.0.value": "+1 (212) 555-1234",
      "0.telecom.0.system": "phone",
      "0.telecom.1.value": "john.doe@example.com",
      "0.telecom.1.system": "email",
      "1.name": "Jane",
      "1.age": 25,
      "1.address.city": "Los Angeles",
      "1.address.state": "CA",
      "1.telecom.0.value": "jane.doe@example.com",
      "1.telecom.0.system": "email",
    });
  });
});
