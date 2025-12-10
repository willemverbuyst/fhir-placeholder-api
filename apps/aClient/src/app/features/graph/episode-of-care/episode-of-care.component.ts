import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { EpisodeOfCare } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { EncounterComponent } from "../encounter/encounter.component";

@Component({
  selector: "episode-of-care-resource",
  imports: [MatButtonModule, EncounterComponent],
  templateUrl: "./episode-of-care.component.html",
  styleUrl: "./episode-of-care.component.scss",
})
export class EpisodeOfCareComponent {
  conditionId = input("");
  episodeOfCares: { id: string }[] = [];
  episodeOfCareId = "";

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`EpisodeOfCare?diagnosis-reference=${this.conditionId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as EpisodeOfCare).id;
          if (id) {
            this.episodeOfCares.push({ id });
          }
        }
      });
  }

  onEpisodeOfCareClick(episodeOfCareId: string): void {
    if (episodeOfCareId === this.episodeOfCareId) {
      this.episodeOfCareId = "";
    } else {
      this.episodeOfCareId = episodeOfCareId;
    }
  }
}
