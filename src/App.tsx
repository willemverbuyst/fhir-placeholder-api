import "./App.css";
import { Organizations } from "./resources/organizations.resource";

function App() {
  return (
    <div className="w-[100vw] overflow-x-auto">
      <div className="flex justify-center min-w-max py-4 space-x-4">
        <Organizations />
      </div>
    </div>
  );
}

export default App;
