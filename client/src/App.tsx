import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { CapabilityStatementPage } from "./pages/capabilityStatement/CapabilityStatementPage";
import { CreatePage } from "./pages/create/CreatePage";
import { Graph } from "./pages/graph/Graph";
import { SearchSortFilterPage } from "./pages/search-sort-filter/SearchSortFilterPage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10">
      <Header />
      <main>
        <Routes>
          <Route index element={<CapabilityStatementPage />} />
          <Route path="graph" element={<Graph />} />
          <Route path="search-sort-filter" element={<SearchSortFilterPage />} />
          <Route path="create" element={<CreatePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
