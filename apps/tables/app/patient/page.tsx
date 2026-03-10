import { DataTable } from "@/components/ui/table";
import Link from "next/link";

const { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } =
  DataTable;

export default function PatientPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader rowSpan={4} value="resourceType" />
                  <TableHeader rowSpan={4} value="id" />
                  <TableHeader colSpan={2} value="text" />
                  <TableHeader colSpan={7} value="identifier" />
                  <TableHeader rowSpan={4} value="active" />
                  <TableHeader colSpan={4} value="name" />
                  <TableHeader colSpan={5} value="telecom" />
                  <TableHeader rowSpan={4} value="gender" />
                </TableRow>
                <TableRow>
                  <TableHeader rowSpan={3} value="status" />
                  <TableHeader rowSpan={3} value="div" />
                  <TableHeader rowSpan={3} value="use" />
                  <TableHeader colSpan={2} value="type" />
                  <TableHeader rowSpan={3} value="system" />
                  <TableHeader rowSpan={3} value="value" />
                  <TableHeader value="period" />
                  <TableHeader value="assigner" />
                  <TableHeader rowSpan={3} value="use" />
                  <TableHeader rowSpan={3} value="family" />
                  <TableHeader rowSpan={3} value="given" />
                  <TableHeader value="period" />
                  <TableHeader rowSpan={3} value="use" />
                  <TableHeader rowSpan={3} value="system" />
                  <TableHeader rowSpan={3} value="value" />
                  <TableHeader rowSpan={3} value="rank" />
                  <TableHeader value="period" />
                </TableRow>
                <TableRow>
                  <TableHeader colSpan={2} value="coding" />
                  <TableHeader rowSpan={2} value="start" />
                  <TableHeader rowSpan={2} value="display" />
                  <TableHeader rowSpan={2} value="end" />
                  <TableHeader rowSpan={2} value="end" />
                </TableRow>
                <TableRow>
                  <TableHeader value="system" />
                  <TableHeader value="code" />
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
                  <TableCell
                    rowSpan={4}
                    value="urn:oid:1.2.36.146.595.217.0.1"
                  />
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
          </div>
        </section>
      </main>
    </div>
  );
}
