import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Cards } from "./pages/cards/Cards";
import { CreateOrganization } from "./pages/create-organization/CreateOrganization";
import { Graph } from "./pages/graph/Graph";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="graph" element={<Graph />} />
          <Route path="cards" element={<Cards />} />
          <Route path="create-organization" element={<CreateOrganization />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
