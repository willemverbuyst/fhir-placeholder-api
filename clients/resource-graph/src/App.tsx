import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { CreateOrganization } from "./pages/create-organization/CreateOrganization";
import { Graph } from "./pages/graph/Graph";
import { Home } from "./pages/home/Home";
import { SearchSortFilter } from "./pages/search-sort-filter/SearchSortFilter";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="graph" element={<Graph />} />
          <Route path="search-sort-filter" element={<SearchSortFilter />} />
          <Route path="create-organization" element={<CreateOrganization />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
