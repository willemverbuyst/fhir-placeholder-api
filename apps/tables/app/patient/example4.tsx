import { DataTable } from "@/components/ui/table";

const exampleData: Record<string, unknown> = {
  deceasedBoolean: false,
  birthDate: "1974-12-25",
  gender: "male",
  active: true,
  id: "example",
  resourceType: "Patient",
  "text.div":
    '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345 (use: USUAL, period: 2001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
  "text.status": "generated",
  "identifier.0.value": "12345",
  "identifier.0.system": "urn:oid:1.2.36.146.595.217.0.1",
  "identifier.0.use": "usual",
  "identifier.0.type.coding.0.code": "MR",
  "identifier.0.type.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0203",
  "identifier.0.period.start": "2001-05-06",
  "identifier.0.assigner.display": "Acme Healthcare",
  "name.0.family": "Chalmers",
  "name.0.use": "official",
  "name.0.given.1": "James",
  "name.0.given.0": "Peter",
  "name.1.use": "usual",
  "name.1.given.0": "Jim",
  "name.2.family": "Windsor",
  "name.2.use": "maiden",
  "name.2.given.1": "James",
  "name.2.given.0": "Peter",
  "name.2.period.end": "2002",
  "telecom.0.use": "home",
  "telecom.1.rank": 1,
  "telecom.1.use": "work",
  "telecom.1.value": "(03) 5555 6473",
  "telecom.1.system": "phone",
  "telecom.2.rank": 2,
  "telecom.2.use": "mobile",
  "telecom.2.value": "(03) 3410 5613",
  "telecom.2.system": "phone",
  "telecom.3.use": "old",
  "telecom.3.value": "(03) 5555 8834",
  "telecom.3.system": "phone",
  "telecom.3.period.end": "2014",
  "_birthDate.extension.0.valueDateTime": "1974-12-25T14:35:45-05:00",
  "_birthDate.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
  "address.0.postalCode": "3999",
  "address.0.state": "Vic",
  "address.0.district": "Rainbow",
  "address.0.city": "PleasantVille",
  "address.0.text": "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
  "address.0.type": "both",
  "address.0.use": "home",
  "address.0.line.0": "534 Erewhon St",
  "address.0.period.start": "1974-12-25",
  "contact.0.gender": "female",
  "contact.0.relationship.0.coding.0.code": "N",
  "contact.0.relationship.0.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0131",
  "contact.0.name.family": "du Marché",
  "contact.0.name._family.extension.0.valueString": "VV",
  "contact.0.name._family.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
  "contact.0.name.given.0": "Bénédicte",
  "contact.0.telecom.0.value": "+33 (237) 998327",
  "contact.0.telecom.0.system": "phone",
  "contact.0.address.postalCode": "3999",
  "contact.0.address.state": "Vic",
  "contact.0.address.district": "Rainbow",
  "contact.0.address.city": "PleasantVille",
  "contact.0.address.type": "both",
  "contact.0.address.use": "home",
  "contact.0.address.line.0": "534 Erewhon St",
  "contact.0.address.period.start": "1974-12-25",
  "contact.0.period.start": "2012",
  "managingOrganization.reference": "Organization/1",
};

function transformKeyToHeader(key: string): string {
  const segments = key.split(".");

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

function getHeaders(data: Record<string, unknown>): string[] {
  return Object.keys(data).map((key) => transformKeyToHeader(key));
}

function updateData(data: Record<string, unknown>): Map<string, string> {
  return new Map(
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
  const headers = getHeaders(exampleData);

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
          {headers.map((header) => (
            <TableCell key={header} value={updatedData.get(header)} />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
