import { Organizations } from "./resources/organization.resource";

export function GraphPage() {
  return (
    <div className="min-h-[100vh] overflow-x-auto p-10">
      <div className="flex justify-center">
        <Organizations />
      </div>
    </div>
  );
}
