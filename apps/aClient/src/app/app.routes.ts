import { Routes } from "@angular/router";
import { CapabilityStatementComponent } from "./features/capability-statement/capability-statement.component";
import { CockpitComponent } from "./features/cockpit/cockpit.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { GraphComponent } from "./features/graph/graph.component";
import { HomeComponent } from "./features/home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "capability-statement",
    component: CapabilityStatementComponent,
  },
  {
    path: "cockpit",
    component: CockpitComponent,
  },
  {
    path: "graph",
    component: GraphComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
];
