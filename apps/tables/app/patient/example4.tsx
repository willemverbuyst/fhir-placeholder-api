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

export default function Example4() {
  return (
    <Table>
      <TableCaption>All data on single row</TableCaption>
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
          <TableHeader value="name 1 family" />
          <TableHeader value="name 1 use" />
          <TableHeader value="name 1 given 1" />
          <TableHeader value="name 1 given 2" />
          <TableHeader value="name 2 use" />
          <TableHeader value="name 2 given 1" />
          <TableHeader value="name 3 family" />
          <TableHeader value="name 3 use" />
          <TableHeader value="name 3 given 1" />
          <TableHeader value="name 3 given 2" />
          <TableHeader value="name 3 period end" />
          <TableHeader value="telecom 1 use" />
          <TableHeader value="telecom 2 rank" />
          <TableHeader value="telecom 2 use" />
          <TableHeader value="telecom 2 value" />
          <TableHeader value="telecom 2 system" />
          <TableHeader value="telecom 3 rank" />
          <TableHeader value="telecom 3 use" />
          <TableHeader value="telecom 3 value" />
          <TableHeader value="telecom 3 system" />
          <TableHeader value="telecom 4 use" />
          <TableHeader value="telecom 4 value" />
          <TableHeader value="telecom 4 system" />
          <TableHeader value="telecom 4 period end" />
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
          <TableCell value="Chalmers" />
          <TableCell value="official" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="usual" />
          <TableCell value="Jim" />
          <TableCell value="Windsor" />
          <TableCell value="maiden" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="2002" />
          <TableCell value="home" />
          <TableCell value={1} />
          <TableCell value="work" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value={2} />
          <TableCell value="mobile" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="old" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="2021-01-01" />
          <TableCell value="male" />
        </TableRow>
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
          <TableCell value="Chalmers" />
          <TableCell value="official" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="usual" />
          <TableCell value="Jim" />
          <TableCell value="Windsor" />
          <TableCell value="maiden" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="2002" />
          <TableCell value="home" />
          <TableCell value={1} />
          <TableCell value="work" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value={2} />
          <TableCell value="mobile" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="old" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="2021-01-01" />
          <TableCell value="male" />
        </TableRow>
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
          <TableCell value="Chalmers" />
          <TableCell value="official" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="usual" />
          <TableCell value="Jim" />
          <TableCell value="Windsor" />
          <TableCell value="maiden" />
          <TableCell value="Peter" />
          <TableCell value="James" />
          <TableCell value="2002" />
          <TableCell value="home" />
          <TableCell value={1} />
          <TableCell value="work" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value={2} />
          <TableCell value="mobile" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="old" />
          <TableCell value="1234567890" />
          <TableCell value="phone" />
          <TableCell value="2021-01-01" />
          <TableCell value="male" />
        </TableRow>
      </TableBody>
    </Table>
  );
}
