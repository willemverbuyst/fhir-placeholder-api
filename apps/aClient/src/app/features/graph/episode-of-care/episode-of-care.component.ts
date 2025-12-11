import { Component, input } from "@angular/core";
import { EpisodeOfCare } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { EncounterComponent } from "../encounter/encounter.component";
import { ResourceItemComponent } from "../resource-item/resource-item.component";

@Component({
  selector: "episode-of-care-resource",
  imports: [ResourceItemComponent, EncounterComponent],
  templateUrl: "./episode-of-care.component.html",
  styleUrl: "./episode-of-care.component.scss",
})
export class EpisodeOfCareComponent {
  conditionId = input("");
  episodeOfCares: { id: string }[] = [];

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
}
