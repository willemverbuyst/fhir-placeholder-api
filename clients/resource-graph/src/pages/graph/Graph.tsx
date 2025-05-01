import { Organizations } from "../../resources/organization.resource";

export function Graph() {
  return (
    <div className="overflow-x-auto p-10">
      <div className="flex justify-center">
        <Organizations />
      </div>
    </div>
  );
}
