import Link from "next/link";

export default function PatientPage() {
  const styling = {
    table: "min-w-full divide-y divide-white bg-slate-900",
    thead: "bg-slate-900",
    tbody: "bg-slate-900 divide-y divide-white",
    tr: "bg-slate-700",
    th: "px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-200",
    td: "px-4 py-2 text-left align-top text-zinc-300 border-r border-zinc-300",
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-4 p-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">Patient</h1>
        <section>
          <Link href="/">Home</Link>
        </section>
        <section>
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <table className={styling.table}>
              <thead className={styling.thead}>
                <tr>
                  <th rowSpan={4} colSpan={1} className={styling.th}>
                    resourceType
                  </th>
                  <th rowSpan={4} colSpan={1} className={styling.th}>
                    id
                  </th>
                  <th rowSpan={1} colSpan={2} className={styling.th}>
                    text
                  </th>
                  <th rowSpan={1} colSpan={7} className={styling.th}>
                    identifier
                  </th>
                  <th rowSpan={4} colSpan={1} className={styling.th}>
                    active
                  </th>
                  <th rowSpan={1} colSpan={4} className={styling.th}>
                    name
                  </th>
                  <th rowSpan={1} colSpan={5} className={styling.th}>
                    telecom
                  </th>
                  <th rowSpan={4} colSpan={1} className={styling.th}>
                    gender
                  </th>
                </tr>
                <tr>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    status
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    div
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    use
                  </th>
                  <th rowSpan={1} colSpan={2} className={styling.th}>
                    type
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    system
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    value
                  </th>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    period
                  </th>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    assigner
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    use
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    family
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    given
                  </th>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    period
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    use
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    system
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    value
                  </th>
                  <th rowSpan={3} colSpan={1} className={styling.th}>
                    rank
                  </th>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    period
                  </th>
                </tr>
                <tr>
                  <th rowSpan={1} colSpan={2} className={styling.th}>
                    coding
                  </th>
                  <th rowSpan={2} colSpan={1} className={styling.th}>
                    start
                  </th>
                  <th rowSpan={2} colSpan={1} className={styling.th}>
                    display
                  </th>
                  <th rowSpan={2} colSpan={1} className={styling.th}>
                    end
                  </th>
                  <th rowSpan={2} colSpan={1} className={styling.th}>
                    end
                  </th>
                </tr>
                <tr>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    system
                  </th>
                  <th rowSpan={1} colSpan={1} className={styling.th}>
                    code
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
                    generated
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    blabla
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    usual
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    http://terminology.hl7.org/CodeSystem/v2-0203
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    MR
                  </td>

                  <td className={styling.td} rowSpan={4}>
                    urn:oid:1.2.36.146.595.217.0.1
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    12345
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    2001-05-06
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    Acme Healthcare
                  </td>
                  <td className={styling.td} rowSpan={4}>
                    true
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    official
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    Chalmers
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    Peter James
                  </td>
                  <td className={styling.td} rowSpan={1}></td>
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
                  <td className={styling.td} rowSpan={1}>
                    usual
                  </td>
                  <td className={styling.td} rowSpan={1}></td>
                  <td className={styling.td} rowSpan={1}>
                    Jim
                  </td>
                  <td className={styling.td} rowSpan={1}></td>
                  <td className={styling.td} rowSpan={1}>
                    mobile
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    phone
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    1234567890
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    1
                  </td>
                  <td className={styling.td} rowSpan={1}></td>
                </tr>
                <tr className={styling.tr}>
                  <td className={styling.td} rowSpan={2}>
                    maiden
                  </td>
                  <td className={styling.td} rowSpan={2}>
                    Windsor
                  </td>
                  <td className={styling.td} rowSpan={2}>
                    Peter James
                  </td>
                  <td className={styling.td} rowSpan={2}>
                    2002
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    work
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    phone
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    1234567890
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    2
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    2021-01-01
                  </td>
                </tr>
                <tr className={styling.tr}>
                  <td className={styling.td} rowSpan={1}>
                    old
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    email
                  </td>
                  <td className={styling.td} rowSpan={1}>
                    john.doe@example.com
                  </td>
                  <td className={styling.td} rowSpan={1}></td>
                  <td className={styling.td} rowSpan={1}>
                    2021-01-01
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
