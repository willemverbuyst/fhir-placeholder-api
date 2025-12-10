import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Encounter } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { ObservationComponent } from "../observation/observation.component";

@Component({
  selector: "encounter-resource",
  imports: [MatButtonModule, ObservationComponent],
  templateUrl: "./encounter.component.html",
  styleUrl: "./encounter.component.scss",
})
export class EncounterComponent {
  episodeOfCareId = input("");
  encounters: { id: string }[] = [];
  encounterId = "";

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Encounter?episode-of-care=${this.episodeOfCareId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Encounter).id;
          if (id) {
            this.encounters.push({ id });
          }
        }
      });
  }

  onEncounterClick(encounterId: string): void {
    if (encounterId === this.encounterId) {
      this.encounterId = "";
    } else {
      this.encounterId = encounterId;
    }
  }
}
