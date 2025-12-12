import { Component, Input } from '@angular/core';
import { EpisodeOfCare } from 'fhir/r5';
import { ObservationComponent } from '../observation/observation.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'encounter-resource',
  imports: [ResourceRendererComponent, ObservationComponent],
  templateUrl: './encounter.component.html',
  styleUrl: './encounter.component.scss',
})
export class EncounterComponent {
  @Input() parent: (EpisodeOfCare & { id: string; selected: boolean }) | null =
    null;

  getUrl() {
    if (!this.parent?.id) {
      return undefined;
    }
    return `Encounter?episode-of-care=${this.parent.id}`;
  }
}
