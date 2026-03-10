const styling = {
  table: "min-w-full divide-y divide-white bg-slate-900",
  thead: "bg-slate-900",
  tbody: "bg-slate-900 divide-y divide-white",
  tr: "bg-slate-700",
  th: "bg-slate-900 px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-200",
  td: "text-nowrap px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-300",
};

function Table({ children }: { children: React.ReactNode }) {
  return <table className={styling.table}>{children}</table>;
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
  return value ? (
    <td className={styling.td} rowSpan={rowSpan} colSpan={colSpan}>
      {value}
    </td>
  ) : (
    <td className={styling.td}></td>
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

export const DataTable = {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
};