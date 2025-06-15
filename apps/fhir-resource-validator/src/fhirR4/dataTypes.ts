import { z } from "zod";
import { Resources } from "./resources";

const base64BinaryRegex = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;
const base64Binary = z.string().regex(base64BinaryRegex);

const dateRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
const date = z.string().regex(dateRegex);

const dateTimeRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;
const dateTime = z.string().regex(dateTimeRegex);

const decimalRegex = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/;
const decimal = z.number().refine((val) => String(val).match(decimalRegex));

const instantRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;
const instant = z.string().regex(instantRegex);

const idRegex = /[A-Za-z0-9\-\\.]{1,64}/;
const id = z.string().regex(idRegex);

const timeRegex = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;
const time = z.string().regex(timeRegex);

const Period = z
  .object({
    start: dateTime.optional(),
    end: dateTime.optional(),
  })
  .strict();

const Address = z
  .object({
    use: z.enum(["home", "work", "temp", "old", "billing"]).optional(),
    type: z.enum(["postal", "physical", "both"]).optional(),
    text: z.string().optional(),
    line: z.array(z.string()).optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    period: Period.optional(),
  })
  .strict();

const Attachment = z
  .object({
    contentType: z.unknown().optional(),
    language: z.unknown().optional(),
    data: z.unknown().optional(),
    url: z.unknown().optional(),
    size: z.unknown().optional(),
    hash: z.unknown().optional(),
    title: z.string().optional(),
    creation: dateTime.optional(),
  })
  .strict();

const Coding = z
  .object({
    system: z.string().optional(),
    version: z.string().optional(),
    code: z.string().optional(),
    display: z.string().optional(),
    userSelected: z.boolean().optional(),
  })
  .strict();

const CodeableConcept = z
  .object({
    coding: z.array(Coding).optional(),
    text: z.string().optional(),
  })
  .strict();

const ContactPoint = z
  .object({
    system: z
      .enum(["phone", "fax", "email", "pager", "url", "sms", "other"])
      .optional(),
    value: z.string().optional(),
    use: z.enum(["home", "work", "temp", "old", "mobile"]).optional(),
    rank: z.number().int().optional(),
    period: Period.optional(),
  })
  .strict();

const HumanName = z
  .object({
    use: z
      .enum([
        "usual",
        "official",
        "temp",
        "nickname",
        "anonymous",
        "old",
        "maiden",
      ])
      .optional(),
    text: z.string().optional(),
    family: z.string().optional(),
    given: z.array(z.string()).optional(),
    prefix: z.array(z.string()).optional(),
    suffix: z.array(z.string()).optional(),
    period: Period.optional(),
  })
  .strict();

const Quantity = z
  .object({
    value: z.number().optional(),
    comparator: z.enum(["<", "<=", ">=", ">"]).optional(),
    unit: z.string().optional(),
    system: z.string().optional(),
    code: z.string().optional(), // TODO coded from unit
  })
  .strict();

const SimpleQuantity = Quantity.omit({ comparator: true });

const Signature = z
  .object({
    type: z.array(Coding),
    when: instant,
    who: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]),
    onBehalfOf: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]).optional(),
    targetFormat: z.string().optional(),
    sigFormat: z.string().optional(),
    data: base64Binary.optional(),
  })
  .strict();

function Reference(resource?: string | string[]) {
  const regex = !resource
    ? null
    : typeof resource === "string"
      ? new RegExp(`^${resource}`)
      : new RegExp(`^${resource.join("|")}`);

  const Reference = z
    .object({
      reference: z.string().optional(),
      type: regex ? z.string().regex(regex).optional() : z.string().optional(),
      indetifier: z.unknown().optional(),
      display: z.string().optional(),
    })
    .strict();

  return Reference;
}

const Narrative = z
  .object({
    status: z.enum(["generated", "extensions", "additional", "empty"]),
    div: z.string(),
  })
  .strict();

const Meta = z
  .object({
    versionId: z.string().optional(),
    lastUpdated: instant.optional(),
    source: z.string().optional(),
    profile: z.unknown().optional(),
    security: Coding.optional(),
    tag: Coding.optional(),
  })
  .strict();

const identifier = z
  .object({
    use: z.enum(["usual", "official", "temp", "secondary", "old"]).optional(),
    type: CodeableConcept.optional(),
    system: z.string().optional(),
    value: z.string().optional(),
    period: Period.optional(),
    assigner: Reference(Resources.Organization).optional(),
  })
  .strict();

const base = z
  .object({
    url: z.string(),
    valueBase64Binary: z.string().regex(/(\s*([0-9a-zA-Z\\+\\=]){4}\s*)+/),
    valueBoolean: z.boolean(),
    valueCodeableConcept: CodeableConcept,
    valueString: z.string(),
    valueQuantity: Quantity,
    valueCode: z.string(),
    valueReference: Reference(),
  })
  .strict()
  .partial();

type Extension = {
  extension?: Extension[];
};

const Range = z.object({
  low: SimpleQuantity.optional(),
  high: SimpleQuantity.optional(),
});

const extension: z.ZodType<Extension> = base
  .extend({
    extension: z.lazy(() => extension.array()).optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Property url is required",
      });
    }

    if (Object.keys(val).filter((i) => i !== "url").length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one of value options or extension is required",
      });
    }

    if (
      Object.keys(val)
        .filter((i) => i !== "url")
        .includes("extension") &&
      Object.keys(val).filter((i) => i !== "url").length > 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Or extension or a value option is allowed, not both",
      });
    }

    if (
      Object.keys(val).filter((i) => i !== "url" && i !== "extension").length >
      1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only one value option is allowed",
      });
    }
  });

export const dataTypes = {
  base64Binary,
  date,
  dateTime,
  decimal,
  instant,
  id,
  identifier,
  time,
  Address,
  Attachment,
  CodeableConcept,
  Coding,
  ContactPoint,
  HumanName,
  Period,
  Quantity,
  Signature,
  Narrative,
  Meta,
  Range,
  SimpleQuantity,
  extension,
  Reference,
};
