import { Component, input } from "@angular/core";
import { Observation } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { ResourceItemComponent } from "../resource-item/resource-item.component";

@Component({
  selector: "observation-resource",
  imports: [ResourceItemComponent],
  templateUrl: "./observation.component.html",
  styleUrl: "./observation.component.scss",
})
export class ObservationComponent {
  encounterId = input("");
  observations: { id: string }[] = [];

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
}
