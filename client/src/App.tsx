import { Route, Routes } from "react-router";
import { Header } from "./components/header/Header";
import { CapabilityStatementPage } from "./pages/capabilityStatement/CapabilityStatementPage";
import { CockpitPage } from "./pages/cockpit/CockpitPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { GraphPage } from "./pages/graph/GraphPage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10">
      <Header />
      <main>
        <Routes>
          <Route index element={<CapabilityStatementPage />} />
          <Route path="graph" element={<GraphPage />} />
          <Route path="cockpit" element={<CockpitPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
