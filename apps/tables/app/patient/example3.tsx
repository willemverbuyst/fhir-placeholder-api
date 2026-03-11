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

export default function Example3() {
  return (
    <Table>
      <TableCaption>All data on separate rows without rowSpan</TableCaption>
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
          <TableCell value="Patient" />
          <TableCell value="Patient-1" />
          <TableCell value="generated" />
          <TableCell value="some html here" />
          <TableCell value="usual" />
          <TableCell value="http://terminology.hl7.org/CodeSystem/v2-0203" />
          <TableCell value="MR" />
          <TableCell value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell value="12345" />
          <TableCell value="2001-05-06" />
          <TableCell value="Acme Healthcare" />
          <TableCell value="true" />
          <TableCell value="official" />
          <TableCell value="Chalmers" />
          <TableCell value="Peter James" />
          <TableCell />
          <TableCell value="home" />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell value="male" />
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell value="usual" />
          <TableCell />
          <TableCell value="Jim" />
          <TableCell />
          <TableCell value="mobile" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={1} />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell value="maiden" />
          <TableCell value="Windsor" />
          <TableCell value="Peter James" />
          <TableCell value="2002" />
          <TableCell value="work" />
          <TableCell value="phone" />
          <TableCell value="1234567890" />
          <TableCell value={2} />
          <TableCell value="2021-01-01" />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell value="old" />
          <TableCell value="email" />
          <TableCell value="john.doe@example.com" />
          <TableCell />
          <TableCell value="2021-01-01" />
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  );
}
