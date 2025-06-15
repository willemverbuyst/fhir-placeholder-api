import { z } from "zod";
import { Resources } from "../resources";

export const Encounter = z
  .object({
    resourceType: z.literal(Resources.Encounter),
    id: z.string(),
  })
  .strict();

export type Encounter = z.infer<typeof Encounter>;
