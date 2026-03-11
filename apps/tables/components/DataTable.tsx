const styling = {
  table: "min-w-full divide-y divide-zinc-300 bg-slate-900",
  caption: "text-left p-4 bg-slate-900 text-xl text-zinc-300",
  thead: "bg-slate-900",
  tbody: "bg-slate-700 divide-y divide-zinc-300",
  tr: "",
  th: "text-nowrap px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-200",
  td: "break-words px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-300 max-w-[200px] truncate",
};

function Table({ children }: { children: React.ReactNode }) {
  return <table className={styling.table}>{children}</table>;
}
function TableCaption({ children }: { children: React.ReactNode }) {
  return <caption className={styling.caption}>{children}</caption>;
}
function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className={styling.thead}>{children}</thead>;
}
function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className={styling.tbody}>{children}</tbody>;
}
function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className={styling.tr}>{children}</tr>;
}
function TableCell({
  value,
  rowSpan = 1,
  colSpan = 1,
}: {
  value?: string | number;
  rowSpan?: number;
  colSpan?: number;
}) {
  return (
    <td
      className={styling.td}
      rowSpan={rowSpan}
      colSpan={colSpan}
      title={String(value)}
    >
      {value}
    </td>
  );
}
function TableHeader({
  value,
  rowSpan = 1,
  colSpan = 1,
}: {
  value?: string;
  rowSpan?: number;
  colSpan?: number;
}) {
  return (
    <th className={styling.th} rowSpan={rowSpan} colSpan={colSpan}>
      {value}
    </th>
  );
}

import { normalizeJSON } from "@repo/normalizer";
import { Bundle } from "fhir/r2";
import { Resource } from "fhir/r5";

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

async function fetchBundle<T extends Resource>(
  resourceType: string,
): Promise<Bundle<T>> {
  const apiUrl = `http://localhost:8080/api/v2/r5/${resourceType}`;

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resources: ${response.status}`);
  }

  const data = (await response.json()) as Bundle<T>;

  return data;
}

function buildTableDataFromBundle<T>(bundle: Bundle<T>): TableData {
  const patients = bundle.entry?.map((entry) => entry.resource).filter(Boolean);
  const normalizedPatients = normalizeJSON(patients) as NormalizedData;

  return prepareDataForTable(normalizedPatients);
}

export default async function DataTable<T extends Resource>({
  resourceType,
}: {
  resourceType: string;
}) {
  const bundle = await fetchBundle<T>(resourceType);
  const tableData = buildTableDataFromBundle<T>(bundle);

  return (
    <Table>
      <TableCaption>Total of {tableData.rows.length} resources</TableCaption>
      <TableCaption>{tableData.headers.size} columns</TableCaption>
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
