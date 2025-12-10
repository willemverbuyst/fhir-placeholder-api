import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Observation } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";

@Component({
  selector: "observation-resource",
  imports: [MatButtonModule],
  templateUrl: "./observation.component.html",
  styleUrl: "./observation.component.scss",
})
export class ObservationComponent {
  encounterId = input("");
  observations: { id: string }[] = [];
  observationId = "";

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Observation?encounter=${this.encounterId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Observation).id;
          if (id) {
            this.observations.push({ id });
          }
        }
      });
  }

  onObservationClick(observationId: string): void {
    if (observationId === this.observationId) {
      this.observationId = "";
    } else {
      this.observationId = observationId;
    }
  }
}
