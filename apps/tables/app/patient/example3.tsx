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
      <TableCaption>Use th in body table rows</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader value="resourceType" />
          <TableHeader value="id" />
          <TableHeader colSpan={2} value="text" />
          <TableHeader colSpan={4} value="identifier" />
          <TableHeader value="active" />
          <TableHeader colSpan={9} value="name" />
          <TableHeader colSpan={12} value="telecom" />
          <TableHeader colSpan={1} value="gender" />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell rowSpan={7} value="Patient" />
          <TableCell rowSpan={7} value="Patient-1" />
          <TableHeader value="status" />
          <TableCell value="generated" />
          <TableHeader colSpan={3} value="use" />
          <TableCell value="usual" />
          <TableCell rowSpan={7} value="true" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="official" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="usual" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="maiden" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="home" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="mobile" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="work" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="old" />
          <TableCell rowSpan={7} value="male" />
        </TableRow>
        <TableRow>
          <TableHeader rowSpan={6} value="div" />
          <TableCell rowSpan={6} value="some html here" />
          <TableHeader rowSpan={2} value="type" />
          <TableHeader rowSpan={2} value="coding" />
          <TableHeader value="system" />
          <TableCell value="http://terminology.hl7.org/CodeSystem/v2-0203" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Chalmers" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Windsor" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="email" />
        </TableRow>
        <TableRow>
          <TableHeader value="code" />
          <TableCell value="MR" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell rowSpan={2} value="Jim" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="john.doe@example.com" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="system" />
          <TableCell value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell value="James" />
          <TableCell value="James" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="1" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="2" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="value" />
          <TableCell value="12345" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="period" />
          <TableHeader colSpan={2} value="start" />
          <TableCell value="2001-05-06" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="assigner" />
          <TableHeader colSpan={2} value="display" />
          <TableCell value="Acme Healthcare" />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={7} value="Patient" />
          <TableCell rowSpan={7} value="Patient-1" />
          <TableHeader value="status" />
          <TableCell value="generated" />
          <TableHeader colSpan={3} value="use" />
          <TableCell value="usual" />
          <TableCell rowSpan={7} value="true" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="official" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="usual" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="maiden" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="home" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="mobile" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="work" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="old" />
          <TableCell rowSpan={7} value="male" />
        </TableRow>
        <TableRow>
          <TableHeader rowSpan={6} value="div" />
          <TableCell rowSpan={6} value="some html here" />
          <TableHeader rowSpan={2} value="type" />
          <TableHeader rowSpan={2} value="coding" />
          <TableHeader value="system" />
          <TableCell value="http://terminology.hl7.org/CodeSystem/v2-0203" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Chalmers" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Windsor" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="email" />
        </TableRow>
        <TableRow>
          <TableHeader value="code" />
          <TableCell value="MR" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell rowSpan={2} value="Jim" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="john.doe@example.com" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="system" />
          <TableCell value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell value="James" />
          <TableCell value="James" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="1" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="2" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="value" />
          <TableCell value="12345" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="period" />
          <TableHeader colSpan={2} value="start" />
          <TableCell value="2001-05-06" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="assigner" />
          <TableHeader colSpan={2} value="display" />
          <TableCell value="Acme Healthcare" />
        </TableRow>
        <TableRow>
          <TableCell rowSpan={7} value="Patient" />
          <TableCell rowSpan={7} value="Patient-1" />
          <TableHeader value="status" />
          <TableCell value="generated" />
          <TableHeader colSpan={3} value="use" />
          <TableCell value="usual" />
          <TableCell rowSpan={7} value="true" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="official" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="usual" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="maiden" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="home" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="mobile" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="work" />
          <TableHeader colSpan={2} value="use" />
          <TableCell value="old" />
          <TableCell rowSpan={7} value="male" />
        </TableRow>
        <TableRow>
          <TableHeader rowSpan={6} value="div" />
          <TableCell rowSpan={6} value="some html here" />
          <TableHeader rowSpan={2} value="type" />
          <TableHeader rowSpan={2} value="coding" />
          <TableHeader value="system" />
          <TableCell value="http://terminology.hl7.org/CodeSystem/v2-0203" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Chalmers" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="family" />
          <TableCell value="Windsor" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="phone" />
          <TableHeader colSpan={2} value="system" />
          <TableCell value="email" />
        </TableRow>
        <TableRow>
          <TableHeader value="code" />
          <TableCell value="MR" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell rowSpan={2} value="Jim" />
          <TableHeader colSpan={2} rowSpan={2} value="given" />
          <TableCell value="Peter" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="42563687" />
          <TableHeader colSpan={2} value="value" />
          <TableCell value="john.doe@example.com" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="system" />
          <TableCell value="urn:oid:1.2.36.146.595.217.0.1" />
          <TableCell value="James" />
          <TableCell value="James" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="1" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="2" />
          <TableHeader colSpan={2} value="rank" />
          <TableCell value="&nbsp;" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={3} value="value" />
          <TableCell value="12345" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="&nbsp;" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
          <TableHeader rowSpan={3} value="period" />
          <TableHeader rowSpan={3} value="end" />
          <TableCell rowSpan={3} value="2002" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="period" />
          <TableHeader colSpan={2} value="start" />
          <TableCell value="2001-05-06" />
        </TableRow>
        <TableRow>
          <TableHeader colSpan={1} value="assigner" />
          <TableHeader colSpan={2} value="display" />
          <TableCell value="Acme Healthcare" />
        </TableRow>
      </TableBody>
    </Table>
  );
}
