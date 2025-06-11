import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardsRendererSkeleton() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
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
      ))}
    </div>
  );
}
