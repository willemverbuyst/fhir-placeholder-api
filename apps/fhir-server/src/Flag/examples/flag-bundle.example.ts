export const flagBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 1,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/Flag/ebd62915-c114-4460-821e-442cc9b553c0",
      resource: {
        id: "ebd62915-c114-4460-821e-442cc9b553c0",
        resourceType: "Flag",
        status: "inactive",
        subject: {
          reference: "Patient/d866ccc7-bf28-4b1d-85d8-d5f2c0d60b24",
        },
        encounter: {
          reference: "Encounter/e6d74d22-dbc2-469b-b4b7-98aae1ecf1f4",
        },
        code: {
          coding: [],
        },
      },
    },
  ],
};
