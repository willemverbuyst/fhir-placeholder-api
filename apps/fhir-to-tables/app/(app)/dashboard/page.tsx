"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import { ErrorAlert } from "@/components/alert/error-alert";
import { InfoAlert } from "@/components/alert/info-alert";
import { Spinner } from "@/components/ui/spinner";
import { createResourceCountQueryOptions } from "@/query/resource-counts.query";

export default function DashboardPage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceCountQueryOptions(),
  );

  if (isPending) return <Spinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="...no data" />;

  const chartData = Object.entries(data).map(([key, value]) => ({
    resourceType: key,
    value,
  }));

  return (
    <div className="justify-self-center p-4">
      <div className="w-full flex flex-col items-center p-20">
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
      </div>
    </div>
  );
}
