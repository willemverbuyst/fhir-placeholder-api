import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Condition } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { EpisodeOfCareComponent } from "../episode-of-care/episode-of-care.component";

@Component({
  selector: "condition-resource",
  imports: [MatButtonModule, EpisodeOfCareComponent],
  templateUrl: "./condition.component.html",
  styleUrl: "./condition.component.scss",
})
export class ConditionComponent {
  patientId = input("");
  conditionId = "";
  conditions: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Condition?patient=${this.patientId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Condition).id;
          if (id) {
            this.conditions.push({ id });
          }
        }
      });
  }

  onConditionClick(conditionId: string): void {
    if (conditionId === this.conditionId) {
      this.conditionId = "";
    } else {
      this.conditionId = conditionId;
    }
  }
}
