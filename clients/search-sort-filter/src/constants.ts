export const RESOURCES = [
  {
    resourceType: "ORGANIZATION",
    color: "bg-amber-800",
  },
  {
    resourceType: "PRACTITIONER_ROLE",
    color: "bg-amber-600",
  },
  {
    resourceType: "PRACTITIONER",
    color: "bg-amber-400",
  },
  {
    resourceType: "PATIENT",
    color: "bg-teal-500",
  },
  {
    resourceType: "CONDITION",
    color: "bg-violet-500",
  },
  {
    resourceType: "EPISODE_OF_CARE",
    color: "bg-blue-900",
  },
  {
    resourceType: "ENCOUNTER",
    color: "bg-green-600",
  },
  {
    resourceType: "OBSERVATION",
    color: "bg-pink-600",
  },
] as const;

export type ResourceType = (typeof RESOURCES)[number]["resourceType"];
