import { Component, input } from '@angular/core';
import { Encounter } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';
import { ObservationComponent } from '../observation/observation.component';
import { ResourceItemComponent } from '../resource-item/resource-item.component';

@Component({
  selector: 'encounter-resource',
  imports: [ResourceItemComponent, ObservationComponent],
  templateUrl: './encounter.component.html',
  styleUrl: './encounter.component.scss',
})
export class EncounterComponent {
  episodeOfCareId = input('');
  encounters: { id: string; selected?: boolean }[] = [];

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
}
