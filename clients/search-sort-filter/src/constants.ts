export const RESOURCES = [
  {
    resourceType: "Organization",
    color: "bg-amber-800",
  },
  {
    resourceType: "PractitionerRole",
    color: "bg-amber-600",
  },
  {
    resourceType: "Practitioner",
    color: "bg-amber-400",
  },
  {
    resourceType: "Patient",
    color: "bg-teal-500",
  },
  {
    resourceType: "Condition",
    color: "bg-violet-500",
  },
  {
    resourceType: "EpisodeOfCare",
    color: "bg-blue-900",
  },
  {
    resourceType: "Encounter",
    color: "bg-green-600",
  },
  {
    resourceType: "Observation",
    color: "bg-pink-600",
  },
] as const;

export type ResourceType = (typeof RESOURCES)[number]["resourceType"];
