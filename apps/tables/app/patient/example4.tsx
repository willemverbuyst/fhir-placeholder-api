import { DataTable } from "@/components/ui/table";

const exampleData: Record<string, unknown> = {
  "__.deceasedBoolean": false,
  "__.birthDate": "1974-12-25",
  "__.gender": "male",
  "__.active": true,
  "__.id": "example",
  "__.resourceType": "Patient",
  "__.text.div":
    '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345 (use: USUAL, period: 2001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
  "__.text.status": "generated",
  "__.identifier.0.value": "12345",
  "__.identifier.0.system": "urn:oid:1.2.36.146.595.217.0.1",
  "__.identifier.0.use": "usual",
  "__.identifier.0.type.coding.0.code": "MR",
  "__.identifier.0.type.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0203",
  "__.identifier.0.period.start": "2001-05-06",
  "__.identifier.0.assigner.display": "Acme Healthcare",
  "__.name.0.family": "Chalmers",
  "__.name.0.use": "official",
  "__.name.0.given.1": "James",
  "__.name.0.given.0": "Peter",
  "__.name.1.use": "usual",
  "__.name.1.given.0": "Jim",
  "__.name.2.family": "Windsor",
  "__.name.2.use": "maiden",
  "__.name.2.given.1": "James",
  "__.name.2.given.0": "Peter",
  "__.name.2.period.end": "2002",
  "__.telecom.0.use": "home",
  "__.telecom.1.rank": 1,
  "__.telecom.1.use": "work",
  "__.telecom.1.value": "(03) 5555 6473",
  "__.telecom.1.system": "phone",
  "__.telecom.2.rank": 2,
  "__.telecom.2.use": "mobile",
  "__.telecom.2.value": "(03) 3410 5613",
  "__.telecom.2.system": "phone",
  "__.telecom.3.use": "old",
  "__.telecom.3.value": "(03) 5555 8834",
  "__.telecom.3.system": "phone",
  "__.telecom.3.period.end": "2014",
  "__._birthDate.extension.0.valueDateTime": "1974-12-25T14:35:45-05:00",
  "__._birthDate.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
  "__.address.0.postalCode": "3999",
  "__.address.0.state": "Vic",
  "__.address.0.district": "Rainbow",
  "__.address.0.city": "PleasantVille",
  "__.address.0.text": "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
  "__.address.0.type": "both",
  "__.address.0.use": "home",
  "__.address.0.line.0": "534 Erewhon St",
  "__.address.0.period.start": "1974-12-25",
  "__.contact.0.gender": "female",
  "__.contact.0.relationship.0.coding.0.code": "N",
  "__.contact.0.relationship.0.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0131",
  "__.contact.0.name.family": "du Marché",
  "__.contact.0.name._family.extension.0.valueString": "VV",
  "__.contact.0.name._family.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
  "__.contact.0.name.given.0": "Bénédicte",
  "__.contact.0.telecom.0.value": "+33 (237) 998327",
  "__.contact.0.telecom.0.system": "phone",
  "__.contact.0.address.postalCode": "3999",
  "__.contact.0.address.state": "Vic",
  "__.contact.0.address.district": "Rainbow",
  "__.contact.0.address.city": "PleasantVille",
  "__.contact.0.address.type": "both",
  "__.contact.0.address.use": "home",
  "__.contact.0.address.line.0": "534 Erewhon St",
  "__.contact.0.address.period.start": "1974-12-25",
  "__.contact.0.period.start": "2012",
  "__.managingOrganization.reference": "Organization/1",
};

function transformKeyToHeader(key: string): string {
  const withoutPrefix = key.startsWith("__.") ? key.slice(3) : key;

  const segments = withoutPrefix.split(".");

  const normalizedSegments = segments.map((segment) => {
    if (/^\d+$/.test(segment)) {
      const numericSegment = Number(segment);
      return Number.isInteger(numericSegment) && numericSegment >= 0
        ? (numericSegment + 1).toString()
        : segment;
    }

    return segment;
  });

  return normalizedSegments.join(" ");
}

function updateData(data: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      return [transformKeyToHeader(key), String(value)];
    }),
  );
}

const {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableCaption,
} = DataTable;

export default function Example4() {
  const updatedData = updateData(exampleData);
  const headers = Object.keys(updatedData);

  return (
    <Table>
      <TableCaption>All data on single row</TableCaption>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header} value={header} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {Object.entries(updatedData).map(([key, value]) => (
            <TableCell key={`${key}-${value}`} value={String(value)} />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
