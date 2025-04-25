export const conditionBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 1,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/Condition/b1e76afc-e8df-4857-a120-875412f7d9e9",
      resource: {
        id: "b1e76afc-e8df-4857-a120-875412f7d9e9",
        note: [
          {
            text: "Vinculum temeritas turba.",
          },
        ],
        resourceType: "Condition",
        subject: {
          reference: "Patient/4595de85-8aa0-4143-b4cc-a8bb15d146c1",
        },
        clinicalStatus: {
          coding: [
            {
              code: "recurrence",
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
            },
          ],
        },
      },
    },
  ],
};
