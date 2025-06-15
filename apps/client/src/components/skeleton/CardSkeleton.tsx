import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => {
            return (
              <div
                key={i}
                className="flex flex-col lg:flex-row lg:justify-between"
              >
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            );
          })}
        </section>
      </CardContent>
    </Card>
  );
}
