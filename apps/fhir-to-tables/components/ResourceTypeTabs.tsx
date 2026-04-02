"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ResourceTypeTabsProps = {
  resourceTypes: string[];
  selectedResourceType: string;
  children: React.ReactNode;
};

export default function ResourceTypeTabs({
  resourceTypes,
  selectedResourceType,
  children,
}: ResourceTypeTabsProps) {
  const router = useRouter();

  return (
    <Tabs
      value={selectedResourceType}
      onValueChange={(value) => {
        router.replace(`/tables?resource-type=${encodeURIComponent(value)}`, {
          scroll: false,
        });
      }}
    >
      <TabsList>
        {resourceTypes.map((resourceType) => (
          <TabsTrigger key={resourceType} value={resourceType}>
            {resourceType}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
