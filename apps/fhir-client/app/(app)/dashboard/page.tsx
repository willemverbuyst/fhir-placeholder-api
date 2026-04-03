"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import { ErrorAlert } from "@/components/alert/error-alert";
import { InfoAlert } from "@/components/alert/info-alert";
import { Card } from "@/components/ui/card";
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
    <Card className="bg-muted w-full min-w-0 sm:w-full lg:w-full 2xl:w-full overflow-x-auto">
      <section className="h-[80vh] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar dataKey="value" fill="var(--color-chart-2)">
              <LabelList dataKey="value" position="top" offset={10} />
            </Bar>
            <XAxis dataKey="resourceType" axisLine={false} tickLine={false} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </Card>
  );
}
