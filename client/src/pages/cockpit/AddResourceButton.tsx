import { Button } from "@/components/ui/button";
import { hasKey } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { FormMap } from "./FormMap";
import { useFormStore } from "./useFormStore";

export function AddResourceButton() {
  const [searchParams] = useSearchParams();
  const { setResourceForm, resourceForm } = useFormStore();
  const resource = searchParams.get("resource");

  useEffect(() => {
    setResourceForm(null);
  }, [setResourceForm]);

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
