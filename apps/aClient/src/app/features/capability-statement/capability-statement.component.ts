import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CapabilityStatement } from "fhir/r5";
import { MetadataService } from "../../core/services/capability-statement.service";

@Component({
  selector: "app-capability-statement",
  imports: [CommonModule],
  templateUrl: "./capability-statement.component.html",
  styleUrl: "./capability-statement.component.scss",
})
export class CapabilityStatementComponent {
  public capabilityStatement: CapabilityStatement | undefined;
  constructor(private metadataDataService: MetadataService) {}

  ngOnInit(): void {
    this.metadataDataService.getMetadata().subscribe((data) => {
      this.capabilityStatement = data;
    });
  }
}
