import { Route, Routes } from "react-router";
import { Header } from "./components/header/Header";
import { CapabilityStatementPage } from "./pages/capabilityStatement/CapabilityStatementPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { GraphPage } from "./pages/graph/GraphPage";
import { SearchSortFilterPage } from "./pages/search-sort-filter/SearchSortFilterPage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10">
      <Header />
      <main>
        <Routes>
          <Route index element={<CapabilityStatementPage />} />
          <Route path="graph" element={<GraphPage />} />
          <Route path="search-sort-filter" element={<SearchSortFilterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
