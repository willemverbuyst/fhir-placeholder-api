import { Component, Input } from '@angular/core';
import { Condition } from 'fhir/r5';
import { EncounterComponent } from '../encounter/encounter.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'episode-of-care-resource',
  imports: [ResourceRendererComponent, EncounterComponent],
  templateUrl: './episode-of-care.component.html',
  styleUrl: './episode-of-care.component.scss',
})
export class EpisodeOfCareComponent {
  @Input() parent: (Condition & { id: string; selected: boolean }) | null =
    null;

  getUrl() {
    if (this.parent?.id) {
      return `EpisodeOfCare?diagnosis-reference=${this.parent.id}`;
    }
    return undefined;
  }
}
