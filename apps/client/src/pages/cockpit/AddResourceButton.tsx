import { Button } from "@/components/ui/button";
import { hasKey } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router";
import { FormMap } from "./form/FormMap";
import { useFormStore } from "./form/useFormStore";

export function AddResourceButton() {
  const [searchParams] = useSearchParams();
  const { setResourceForm, resourceForm } = useFormStore();
  const resource = searchParams.get("resource");

  function handleClick() {
    if (resourceForm === resource) {
      setResourceForm(null);
    } else if (resource && hasKey(FormMap, resource)) {
      setResourceForm(resource);
    }
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      {resource}&nbsp;
      <Plus />
    </Button>
  );
}
