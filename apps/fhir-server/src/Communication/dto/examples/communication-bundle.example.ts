export const communicationBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 1,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/Communication/e2ff2641-f0d4-4725-abb0-00ed572b7035",
      resource: {
        id: "e2ff2641-f0d4-4725-abb0-00ed572b7035",
        resourceType: "Communication",
        status: "completed",
        subject: {
          reference: "Patient/048ccf3b-c487-49c2-b539-106e39c2dd86",
        },
        encounter: {
          reference: "Encounter/5af9679a-f4b9-47fa-9ec9-a24be77919f6",
        },
        note: [
          {
            text: "Temporibus subnecto amplexus cuppedia conitor.",
          },
        ],
      },
    },
  ],
};
