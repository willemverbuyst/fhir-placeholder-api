export const allergyIntoleranceBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 24,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/AllergyIntolerance/ea57b1fd-08c9-41b7-91ad-971fa1556930",
      resource: {
        id: "allergy-intolerance-1",
        resourceType: "AllergyIntolerance",
        clinicalStatus: {
          coding: [
            {
              code: "active",
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
            },
          ],
        },
        patient: {
          reference: "Patient/patient-1",
        },
        encounter: {
          reference: "Encounter/encounter-1",
        },
        note: [
          {
            text: "Vobis complectus exercitationem possimus quos nesciunt alveus.",
          },
        ],
        type: {
          coding: [
            {
              code: "intolerance",
              system: "http://hl7.org/fhir/allergy-intolerance-type",
              display: "Intolerance",
            },
          ],
        },
        category: ["food"],
        criticality: "high",
      },
    },
  ],
};
