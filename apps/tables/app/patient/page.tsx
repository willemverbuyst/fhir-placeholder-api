import Link from "next/link";

export default function PatientPage() {
  const styling = {
    table: "min-w-full divide-y divide-zinc-200 dark:divide-zinc-700",
    thead: "bg-zinc-100 dark:bg-zinc-800",
    tbody:
      "bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-700",
    tr: "hover:bg-zinc-50 dark:hover:bg-zinc-800 transition",
    th: "px-4 py-2 text-left align-top text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-700",
    td: "px-4 py-2 text-left align-top text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-700",
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <table className={styling.table}>
              <thead className={styling.thead}>
                <tr>
                  <th rowSpan={3} scope="col" className={styling.th}>
                    resourceType
                  </th>
                  <th rowSpan={3} scope="col" className={styling.th}>
                    id
                  </th>
                  <th rowSpan={3} scope="col" className={styling.th}>
                    active
                  </th>
                  <th
                    rowSpan={1}
                    colSpan={2}
                    scope="colgroup"
                    className={styling.th}
                  >
                    text
                  </th>
                  <th
                    rowSpan={1}
                    colSpan={5}
                    scope="col"
                    className={styling.th}
                  >
                    telecom
                  </th>
                  <th
                    rowSpan={3}
                    colSpan={1}
                    scope="col"
                    className={styling.th}
                  >
                    gender
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    status
                  </th>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    div
                  </th>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    use
                  </th>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    system
                  </th>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    value
                  </th>
                  <th
                    colSpan={1}
                    rowSpan={2}
                    scope="col"
                    className={styling.th}
                  >
                    rank
                  </th>
                  <th colSpan={1} scope="colgroup" className={styling.th}>
                    period
                  </th>
                </tr>
                <tr>
                  <th colSpan={1} scope="col" className={styling.th}>
                    end
                  </th>
                </tr>
              </thead>
              <tbody className={styling.tbody}>
                <tr className={styling.tr}>
                  <td className={styling.td} rowSpan={4}>
                    Patient
                  </td>
                  <td rowSpan={4} className={styling.td}>
                    Patient-1
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    true
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    generated
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    blabla
                  </td>
                  <td className={styling.td}>home</td>
                  <td className={styling.td}></td>
                  <td className={styling.td}></td>
                  <td className={styling.td}></td>
                  <td className={styling.td}></td>
                  <td className={styling.td} rowSpan={4}>
                    male
                  </td>
                </tr>
                <tr className={styling.tr}>
                  <td className={styling.td}>mobile</td>
                  <td className={styling.td}>phone</td>
                  <td className={styling.td}>1234567890</td>
                  <td className={styling.td}>1</td>
                  <td className={styling.td}></td>
                </tr>
                <tr className={styling.tr}>
                  <td className={styling.td}>work</td>
                  <td className={styling.td}>phone</td>
                  <td className={styling.td}>1234567890</td>
                  <td className={styling.td}>2</td>
                  <td className={styling.td}>2021-01-01</td>
                </tr>
                <tr className={styling.tr}>
                  <td className={styling.td}>old</td>
                  <td className={styling.td}>email</td>
                  <td className={styling.td}>john.doe@example.com</td>
                  <td className={styling.td}></td>
                  <td className={styling.td}>2021-01-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
