import { DataTable } from "@/components/ui/table";

const {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableCaption,
} = DataTable;

export default function Example2() {
  return (
    <Table>
      <TableCaption>All data on separate rows with rowSpan</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader value="resourceType" />
          <TableHeader value="id" />
          <TableHeader value="text status" />
          <TableHeader value="text div" />
          <TableHeader value="identifier use" />
          <TableHeader value="identifier type coding system" />
          <TableHeader value="identifier type coding code" />
          <TableHeader value="identifier system" />
          <TableHeader value="identifier value" />
          <TableHeader value="identifier period end" />
          <TableHeader value="identifier assigner display" />
          <TableHeader value="active" />
          <TableHeader value="name use" />
          <TableHeader value="name family" />
          <TableHeader value="name given" />
          <TableHeader value="name period end" />
          <TableHeader value="telecom use" />
          <TableHeader value="telecom system" />
          <TableHeader value="telecom value" />
          <TableHeader value="telecom rank" />
          <TableHeader value="telecom period end" />
          <TableHeader value="gender" />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell rowSpan={4} value="Patient" />
          <TableCell rowSpan={4} value="Patient-1" />
          <TableCell rowSpan={4} value="generated" />
          <TableCell rowSpan={4} value="some html here" />
          <TableCell rowSpan={4} value="usual" />
          <TableCell
            rowSpan={4}
            value="http://terminology.hl7.org/CodeSystem/v2-0203"
          />
          <TableCell rowSpan={4} value="MR" />
          <TableCell rowSpan={4} value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell rowSpan={4} value="12345" />
          <TableCell rowSpan={4} value="2001-05-06" />
          <TableCell rowSpan={4} value="Acme Healthcare" />
          <TableCell rowSpan={4} value="true" />
          <TableCell value="official" />
          <TableCell value="Chalmers" />
          <TableCell value="Peter James" />
          <TableCell />
          <TableCell value="home" />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell rowSpan={4} value="male" />
        </TableRow>
        <TableRow>
          <TableCell value="usual" />
          <TableCell />
          <TableCell value="Jim" />
          <TableCell />
          <TableCell value="mobile" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={1} />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2} value="maiden" />
          <TableCell rowSpan={2} value="Windsor" />
          <TableCell rowSpan={2} value="Peter James" />
          <TableCell rowSpan={2} value="2002" />
          <TableCell value="work" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={2} />
          <TableCell value="2021-01-01" />
        </TableRow>
        <TableRow>
          <TableCell value="old" />
          <TableCell value="email" />
          <TableCell value="john.doe@example.com" />
          <TableCell />
          <TableCell value="2021-01-01" />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={4} value="Patient" />
          <TableCell rowSpan={4} value="Patient-1" />
          <TableCell rowSpan={4} value="generated" />
          <TableCell rowSpan={4} value="some html here" />
          <TableCell rowSpan={4} value="usual" />
          <TableCell
            rowSpan={4}
            value="http://terminology.hl7.org/CodeSystem/v2-0203"
          />
          <TableCell rowSpan={4} value="MR" />
          <TableCell rowSpan={4} value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell rowSpan={4} value="12345" />
          <TableCell rowSpan={4} value="2001-05-06" />
          <TableCell rowSpan={4} value="Acme Healthcare" />
          <TableCell rowSpan={4} value="true" />
          <TableCell value="official" />
          <TableCell value="Chalmers" />
          <TableCell value="Peter James" />
          <TableCell />
          <TableCell value="home" />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell rowSpan={4} value="male" />
        </TableRow>
        <TableRow>
          <TableCell value="usual" />
          <TableCell />
          <TableCell value="Jim" />
          <TableCell />
          <TableCell value="mobile" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={1} />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2} value="maiden" />
          <TableCell rowSpan={2} value="Windsor" />
          <TableCell rowSpan={2} value="Peter James" />
          <TableCell rowSpan={2} value="2002" />
          <TableCell value="work" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={2} />
          <TableCell value="2021-01-01" />
        </TableRow>
        <TableRow>
          <TableCell value="old" />
          <TableCell value="email" />
          <TableCell value="john.doe@example.com" />
          <TableCell />
          <TableCell value="2021-01-01" />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={4} value="Patient" />
          <TableCell rowSpan={4} value="Patient-1" />
          <TableCell rowSpan={4} value="generated" />
          <TableCell rowSpan={4} value="some html here" />
          <TableCell rowSpan={4} value="usual" />
          <TableCell
            rowSpan={4}
            value="http://terminology.hl7.org/CodeSystem/v2-0203"
          />
          <TableCell rowSpan={4} value="MR" />
          <TableCell rowSpan={4} value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell rowSpan={4} value="12345" />
          <TableCell rowSpan={4} value="2001-05-06" />
          <TableCell rowSpan={4} value="Acme Healthcare" />
          <TableCell rowSpan={4} value="true" />
          <TableCell value="official" />
          <TableCell value="Chalmers" />
          <TableCell value="Peter James" />
          <TableCell />
          <TableCell value="home" />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell rowSpan={4} value="male" />
        </TableRow>
        <TableRow>
          <TableCell value="usual" />
          <TableCell />
          <TableCell value="Jim" />
          <TableCell />
          <TableCell value="mobile" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={1} />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2} value="maiden" />
          <TableCell rowSpan={2} value="Windsor" />
          <TableCell rowSpan={2} value="Peter James" />
          <TableCell rowSpan={2} value="2002" />
          <TableCell value="work" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={2} />
          <TableCell value="2021-01-01" />
        </TableRow>
        <TableRow>
          <TableCell value="old" />
          <TableCell value="email" />
          <TableCell value="john.doe@example.com" />
          <TableCell />
          <TableCell value="2021-01-01" />
        </TableRow>
      </TableBody>
    </Table>
  );
}
