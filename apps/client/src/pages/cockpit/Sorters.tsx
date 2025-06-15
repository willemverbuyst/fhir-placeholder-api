import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpAZIcon, ArrowUpZAIcon } from "lucide-react";
import type { Sorter } from "../../interfaces/Sorter";

interface Props<T> {
  sortKeys: Array<keyof T>;
  setSortProperty(sortProperty: Sorter<T>): void;
}

export function Sorters<T>(props: Props<T>): React.JSX.Element {
  const { setSortProperty, sortKeys } = props;

  return (
    <section className="flex flex-col gap-2 items-start w-[350px] sm:w-[600px] lg:w-[900px]">
      <Label>sort</Label>
      <Select
        onValueChange={(e) => {
          const [property, direction] = e.split("-") as [
            keyof T,
            "asc" | "desc",
          ];
          setSortProperty({
            property,
            isDescending: direction === "desc",
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortKeys
            .map((k) => String(k))
            .map((key) => (
              <SelectGroup key={key}>
                <SelectItem value={`${key}-asc`}>
                  {key}&nbsp;
                  <ArrowUpAZIcon />
                </SelectItem>
                <SelectItem value={`${key}-desc`}>
                  {key}&nbsp;
                  <ArrowUpZAIcon />
                </SelectItem>
              </SelectGroup>
            ))}
        </SelectContent>
      </Select>
    </section>
  );
}
