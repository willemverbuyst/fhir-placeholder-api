import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/message/ErrorMessage";
import { InfoMessage } from "@/components/message/InfoMessage";
import { createResourceCountQueryOptions } from "@/query/resource-counts.query";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";

export function DashboardPage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceCountQueryOptions(),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;
  if (!data) return <InfoMessage message="...no data" />;

  const chartData = Object.entries(data).map(([key, value]) => ({
    resourceType: key,
    value,
  }));

  return (
    <section className="h-[50vh] w-[50vw]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={chartData}>
          <Bar dataKey="value" fill="var(--color-chart-2)">
            <LabelList
              dataKey="value"
              position="top"
              stroke="var(--foreground)"
              offset={10}
            />
          </Bar>
          <XAxis
            dataKey="resourceType"
            axisLine={false}
            tickLine={false}
            stroke="var(--foreground)"
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
