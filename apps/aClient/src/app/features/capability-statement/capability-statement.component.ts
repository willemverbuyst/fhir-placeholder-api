import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { CapabilityStatementRestResource } from "fhir/r5";
import { MetadataService } from "../../core/services/capability-statement.service";

@Component({
  selector: "app-capability-statement",
  imports: [CommonModule, MatCard, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: "./capability-statement.component.html",
  styleUrl: "./capability-statement.component.scss",
})
export class CapabilityStatementComponent {
  public capabilityStatementResources: CapabilityStatementRestResource[];
  constructor(private metadataDataService: MetadataService) {
    this.capabilityStatementResources = [];
  }

  ngOnInit(): void {
    this.metadataDataService.getMetadata().subscribe((data) => {
      if (data.rest?.[0].mode === "server") {
        this.capabilityStatementResources = data.rest?.[0].resource || [];
      }
    });
  }
}
