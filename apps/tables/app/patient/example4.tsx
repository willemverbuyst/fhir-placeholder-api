import { DataTable } from "@/components/ui/table";
import { normalizeJSON } from "@repo/normalizer";
import { Bundle, Patient } from "fhir/r2";
import { useEffect, useState } from "react";

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

  for (const [key, value] of Object.entries(data)) {
    const separatorIndex = key.indexOf(".");
    const prefix = key.slice(0, separatorIndex);
    const keyWithoutPrefix = key.slice(separatorIndex + 1);
    const rowIndex = Number(prefix);

    if (!Number.isInteger(rowIndex) || rowIndex < 0) {
      throw new Error(`Invalid key: ${key}`);
    }

    tableData.headers.add(keyWithoutPrefix);
    if (!tableData.data[rowIndex]) {
      tableData.data[rowIndex] = new Map<string, string>();
    }
    tableData.data[rowIndex].set(keyWithoutPrefix, String(value));
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
  const [patients, setPatients] = useState<Record<string, unknown>>();
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v2/r5/Patient");

        if (!response.ok) {
          throw new Error(`Failed to fetch patients: ${response.status}`);
        }

        const data = (await response.json()) as Bundle<Patient>;
        const patients = data.entry?.map((entry) => entry.resource);
        const normalizedPatients = normalizeJSON(patients);
        console.log("Fetched patients Bundle<Patient>", normalizedPatients);
        setPatients(normalizedPatients);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    void fetchPatients();
  }, []);
  const tableData = prepareDataForTable(patients ?? {});

  return (
    <Table>
      <TableCaption>Patients</TableCaption>
      <TableHead>
        <TableRow>
          {Array.from(tableData.headers).map((header) => (
            <TableHeader key={header} value={transformKeyToHeader(header)} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.data.map((row, index) => (
          <TableRow key={row.get("id") ?? `row-${index}`}>
            {Array.from(tableData.headers).map((header) => (
              <TableCell key={header} value={row.get(header)} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
