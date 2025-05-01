import { Route, Routes } from "react-router";
import { Cards } from "./Cards";
import { Graph } from "./Graph";

function App() {
  return (
    <Routes>
      <Route path="graph" element={<Graph />} />
      <Route path="cards" element={<Cards />} />
    </Routes>
  );
}

export default App;
