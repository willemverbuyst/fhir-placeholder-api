import { DataTable } from "@/components/ui/table";
import { normalizeJSON } from "@repo/normalizer";
import { Bundle, Patient } from "fhir/r2";

type TableData = {
  headers: Set<string>;
  rows: Map<string, string>[];
};

type NormalizedData = Record<string, unknown>;

function transformKeyToHeader(key: string): string {
  if (!key) {
    return "";
  }

  const segments = key.split(".");

  const normalizedSegments = segments.map((segment) => {
    if (/^\d+$/.test(segment)) {
      const numericSegment = Number(segment);
      if (Number.isInteger(numericSegment) && numericSegment >= 0) {
        return (numericSegment + 1).toString();
      }
    }

    return segment;
  });

  return normalizedSegments.join(" ");
}

function prepareDataForTable(data: NormalizedData): TableData {
  const tableData: TableData = { headers: new Set<string>(), rows: [] };

  for (const [key, value] of Object.entries(data)) {
    const separatorIndex = key.indexOf(".");

    if (separatorIndex === -1) {
      continue;
    }

    const prefix = key.slice(0, separatorIndex);
    const keyWithoutPrefix = key.slice(separatorIndex + 1);
    const rowIndex = Number(prefix);

    if (!Number.isInteger(rowIndex) || rowIndex < 0) {
      continue;
    }

    tableData.headers.add(keyWithoutPrefix);

    if (!tableData.rows[rowIndex]) {
      tableData.rows[rowIndex] = new Map<string, string>();
    }

    tableData.rows[rowIndex].set(keyWithoutPrefix, String(value));
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

async function fetchPatientBundle(): Promise<Bundle<Patient>> {
  const apiUrl = "http://localhost:8080/api/v2/r5/Patient";

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patients: ${response.status}`);
  }

  const data = (await response.json()) as Bundle<Patient>;

  return data;
}

function buildTableDataFromBundle(bundle: Bundle<Patient>): TableData {
  const patients = bundle.entry?.map((entry) => entry.resource).filter(Boolean);
  const normalizedPatients = normalizeJSON(patients) as NormalizedData;

  return prepareDataForTable(normalizedPatients);
}

export default async function PatientDataTable() {
  const bundle = await fetchPatientBundle();
  const tableData = buildTableDataFromBundle(bundle);

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
        {tableData.rows.map((row, index) => (
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
