import { Route, Routes } from "react-router";
import { Header } from "./components/header/Header";
import { Toaster } from "./components/ui/sonner";
import { CapabilityStatementPage } from "./pages/capabilityStatement/CapabilityStatementPage";
import { CockpitPage } from "./pages/cockpit/CockpitPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { GraphPage } from "./pages/graph/GraphPage";
import { TreePage } from "./pages/tree/TreePage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10">
      <Header />
      <main className="px-5">
        <Routes>
          <Route index element={<CapabilityStatementPage />} />
          <Route path="graph" element={<GraphPage />} />
          <Route path="cockpit" element={<CockpitPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tree" element={<TreePage />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
