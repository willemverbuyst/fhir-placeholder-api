import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { OrganizationComponent } from "./organization/organization.component";

@Component({
  selector: "app-graph",
  imports: [MatButtonModule, CommonModule, OrganizationComponent],
  templateUrl: "./graph.component.html",
  styleUrl: "./graph.component.scss",
})
export class GraphComponent {}
