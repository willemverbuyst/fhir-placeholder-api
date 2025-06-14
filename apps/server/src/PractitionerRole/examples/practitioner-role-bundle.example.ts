export const practitionerRoleBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 1,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/PractitionerRole/practitioner-role-1",
      resource: {
        id: "practitioner-role-1",
        resourceType: "PractitionerRole",
        organization: {
          reference: "Organization/organization-1",
        },
        practitioner: {
          reference: "Practitioner/practitioner-1",
        },
      },
    },
  ],
};
