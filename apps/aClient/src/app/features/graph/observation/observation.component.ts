import { Component, Input } from '@angular/core';
import { Encounter } from 'fhir/r5';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'observation-resource',
  imports: [ResourceRendererComponent],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.scss',
})
export class ObservationComponent {
  @Input() parent: (Encounter & { id: string; selected: boolean }) | null =
    null;

  getUrl() {
    if (!this.parent?.id) {
      return undefined;
    }
    return `Observation?encounter=${this.parent?.id}`;
  }
}
