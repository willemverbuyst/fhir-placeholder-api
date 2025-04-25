import type { Organization } from "fhir/r5";

export const organizations: (Organization & { id: string })[] = [
  {
    id: "organization-1",
    resourceType: "Organization",
    name: "Pouros, Kiehn and Stroman",
    active: true,
  },

  {
    id: "organization-2",
    resourceType: "Organization",
    name: "Kuphal and Sons",
    active: true,
  },

  {
    id: "organization-3",
    resourceType: "Organization",
    name: "Goodwin and Sons",
    active: true,
  },
];
