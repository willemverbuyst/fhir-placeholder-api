import { DataTable } from "@/components/ui/table";

const exampleData: Record<string, unknown> = {
  "0.deceasedBoolean": false,
  "0.birthDate": "1974-12-25",
  "0.gender": "male",
  "0.active": true,
  "0.id": "patient-1",
  "0.resourceType": "Patient",
  "0.text.div":
    '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345 (use: USUAL, period: 2001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
  "0.text.status": "generated",
  "0.identifier.0.value": "12345",
  "0.identifier.0.system": "urn:oid:1.2.36.146.595.217.0.1",
  "0.identifier.0.use": "usual",
  "0.identifier.0.type.coding.0.code": "MR",
  "0.identifier.0.type.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0203",
  "0.identifier.0.period.start": "2001-05-06",
  "0.identifier.0.assigner.display": "Acme Healthcare",
  "0.name.0.family": "Chalmers",
  "0.name.0.use": "official",
  "0.name.0.given.1": "James",
  "0.name.0.given.0": "Peter",
  "0.name.1.use": "usual",
  "0.name.1.given.0": "Jim",
  "0.name.2.family": "Windsor",
  "0.name.2.use": "maiden",
  "0.name.2.given.1": "James",
  "0.name.2.given.0": "Peter",
  "0.name.2.period.end": "2002",
  "0.telecom.0.use": "home",
  "0.telecom.1.rank": 1,
  "0.telecom.1.use": "work",
  "0.telecom.1.value": "(03) 5555 6473",
  "0.telecom.1.system": "phone",
  "0.telecom.2.rank": 2,
  "0.telecom.2.use": "mobile",
  "0.telecom.2.value": "(03) 3410 5613",
  "0.telecom.2.system": "phone",
  "0.telecom.3.use": "old",
  "0.telecom.3.value": "(03) 5555 8834",
  "0.telecom.3.system": "phone",
  "0.telecom.3.period.end": "2014",
  "0._birthDate.extension.0.valueDateTime": "1974-12-25T14:35:45-05:00",
  "0._birthDate.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
  "0.address.0.postalCode": "3999",
  "0.address.0.state": "Vic",
  "0.address.0.district": "Rainbow",
  "0.address.0.city": "PleasantVille",
  "0.address.0.text": "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
  "0.address.0.type": "both",
  "0.address.0.use": "home",
  "0.address.0.line.0": "534 Erewhon St",
  "0.address.0.period.start": "1974-12-25",
  "0.contact.0.gender": "female",
  "0.contact.0.relationship.0.coding.0.code": "N",
  "0.contact.0.relationship.0.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0131",
  "0.contact.0.name.family": "du Marché",
  "0.contact.0.name._family.extension.0.valueString": "VV",
  "0.contact.0.name._family.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
  "0.contact.0.name.given.0": "Bénédicte",
  "0.contact.0.telecom.0.value": "+33 (237) 998327",
  "0.contact.0.telecom.0.system": "phone",
  "0.contact.0.address.postalCode": "3999",
  "0.contact.0.address.state": "Vic",
  "0.contact.0.address.district": "Rainbow",
  "0.contact.0.address.city": "PleasantVille",
  "0.contact.0.address.type": "both",
  "0.contact.0.address.use": "home",
  "0.contact.0.address.line.0": "534 Erewhon St",
  "0.contact.0.address.period.start": "1974-12-25",
  "0.contact.0.period.start": "2012",
  "0.managingOrganization.reference": "Organization/1",
  "1.deceasedBoolean": false,
  "1.birthDate": "1974-12-25",
  "1.gender": "male",
  "1.id": "patient-2",
  "1.resourceType": "Patient",
  "1.text.div":
    '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Jim </b> male, DoB: 1974-12-25 ( Medical record number: 12345 (use: USUAL, period: 2001-05-06 --&gt; (ongoing)))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Record is active">Active:</td><td>true</td><td style="background-color: #f3f5da" title="Known status of Patient">Deceased:</td><td colspan="3">false</td></tr><tr><td style="background-color: #f3f5da" title="Alternate names (see the one above)">Alt Names:</td><td colspan="3"><ul><li>Peter James Chalmers (OFFICIAL)</li><li>Peter James Windsor (MAIDEN)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Details:</td><td colspan="3"><ul><li>-unknown-(HOME)</li><li>ph: (03) 5555 6473(WORK)</li><li>ph: (03) 3410 5613(MOBILE)</li><li>ph: (03) 5555 8834(OLD)</li><li>534 Erewhon St PeasantVille, Rainbow, Vic 3999(HOME)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Nominated Contact: Next-of-Kin">Next-of-Kin:</td><td colspan="3"><ul><li>Bénédicte du Marché (female)</li><li>534 Erewhon St PleasantVille Vic 3999 (HOME)</li><li><a href="tel:+33(237)998327">+33 (237) 998327</a></li><li>Valid Period: 2012 --&gt; (ongoing)</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="organization-example-gastro.html">Organization/1</a> &quot;Gastroenterology&quot;</li></ul></td></tr></table></div>',
  "1.text.status": "generated",
  "1.identifier.0.value": "12345",
  "1.identifier.0.system": "urn:oid:1.2.36.146.595.217.0.1",
  "1.identifier.0.use": "usual",
  "1.identifier.0.type.coding.0.code": "MR",
  "1.identifier.0.type.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0203",
  "1.identifier.0.period.start": "2001-05-06",
  "1.identifier.0.assigner.display": "Acme Healthcare",
  "1.name.0.family": "Chalmers",
  "1.name.0.use": "official",
  "1.name.0.given.1": "James",
  "1.name.0.given.0": "Peter",
  "1.name.1.use": "usual",
  "1.name.1.given.0": "Jim",
  "1.name.2.family": "Windsor",
  "1.name.2.use": "maiden",
  "1.name.2.given.1": "James",
  "1.name.2.given.0": "Peter",
  "1.name.2.period.end": "2002",
  "1.telecom.0.use": "home",
  "1.telecom.1.rank": 1,
  "1.telecom.1.use": "work",
  "1.telecom.1.value": "(03) 5555 6473",
  "1.telecom.1.system": "phone",
  "1.telecom.2.rank": 2,
  "1.telecom.2.use": "mobile",
  "1.telecom.2.value": "(03) 3410 5613",
  "1.telecom.2.system": "phone",
  "1.telecom.3.use": "old",
  "1.telecom.3.value": "(03) 5555 8834",
  "1.telecom.3.system": "phone",
  "1.telecom.3.period.end": "2014",
  "1._birthDate.extension.0.valueDateTime": "1974-12-25T14:35:45-05:00",
  "1._birthDate.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
  "1.address.0.postalCode": "3999",
  "1.address.0.state": "Vic",
  "1.address.0.district": "Rainbow",
  "1.address.0.city": "PleasantVille",
  "1.address.0.text": "534 Erewhon St PeasantVille, Rainbow, Vic 3999",
  "1.address.0.type": "both",
  "1.address.0.use": "home",
  "1.address.0.line.0": "534 Erewhon St",
  "1.address.0.period.start": "1974-12-25",
  "1.contact.0.gender": "female",
  "1.contact.0.relationship.0.coding.0.code": "N",
  "1.contact.0.relationship.0.coding.0.system":
    "http://terminology.hl7.org/CodeSystem/v2-0131",
  "1.contact.0.name.family": "du Marché",
  "1.contact.0.name._family.extension.0.valueString": "VV",
  "1.contact.0.name._family.extension.0.url":
    "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
  "1.contact.0.name.given.0": "Bénédicte",
  "1.contact.0.telecom.0.value": "+33 (237) 998327",
  "1.contact.0.telecom.0.system": "phone",
  "1.contact.0.address.postalCode": "3999",
  "1.contact.0.address.state": "Vic",
  "1.contact.0.address.district": "Rainbow",
  "1.contact.0.address.city": "PleasantVille",
  "1.contact.0.address.type": "both",
  "1.contact.0.address.use": "home",
  "1.contact.0.address.line.0": "534 Erewhon St",
  "1.contact.0.address.period.start": "1974-12-25",
  "1.contact.0.period.start": "2012",
  "1.managingOrganization.reference": "Organization/1",
  "1.foo": "bar",
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

type TableData = {
  headers: Set<string>;
  data: Map<string, string>[];
};

function prepareDataForTable(data: Record<string, unknown>): TableData {
  const tableData: TableData = { headers: new Set<string>(), data: [] };

  for (const key of Object.keys(data)) {
    const i = key.indexOf(".");
    const prefix = key.slice(0, i);
    const keyWithoutPrefix = key.slice(i + 1);

    if (Number.isNaN(Number(prefix))) {
      throw new Error(`Invalid key: ${key}`);
    }

    tableData.headers.add(keyWithoutPrefix);
    if (!tableData.data[prefix as unknown as number]) {
      tableData.data[prefix as unknown as number] = new Map<string, string>();
    }
    tableData.data[prefix as unknown as number].set(
      keyWithoutPrefix,
      String(data[key]),
    );
  }

  return tableData;
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
  const tableData = prepareDataForTable(exampleData);

  return (
    <Table>
      <TableCaption>All data on single row</TableCaption>
      <TableHead>
        <TableRow>
          {Array.from(tableData.headers).map((header) => (
            <TableHeader key={header} value={transformKeyToHeader(header)} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.data.map((row, index) => (
          <TableRow key={index}>
            {Array.from(tableData.headers).map((header) => (
              <TableCell key={header} value={row.get(header)} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
