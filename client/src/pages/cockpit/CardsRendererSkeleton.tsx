import { CardsSkeleton } from "@/components/skeleton/CardSkeleton";

export function CardsRendererSkeleton() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <CardsSkeleton key={i} />
      ))}
    </div>
  );
}
