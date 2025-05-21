import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { CapabilityStatement } from "./pages/capabilityStatement/CapabilityStatement";
import { Create } from "./pages/create-organization/Create";
import { Graph } from "./pages/graph/Graph";
import { SearchSortFilterPage } from "./pages/search-sort-filter/SearchSortFilterPage";

function App() {
  return (
    <div className="bg-slate-800 text-white w-full min-h-screen flex flex-col items-center">
      <Header />
      <main>
        <Routes>
          <Route index element={<CapabilityStatement />} />
          <Route path="graph" element={<Graph />} />
          <Route path="search-sort-filter" element={<SearchSortFilterPage />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
