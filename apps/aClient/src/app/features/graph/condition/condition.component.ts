import { Component, Input } from '@angular/core';
import { Patient } from 'fhir/r4b';
import { EpisodeOfCareComponent } from '../episode-of-care/episode-of-care.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'condition-resource',
  imports: [ResourceRendererComponent, EpisodeOfCareComponent],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.scss',
})
export class ConditionComponent {
  @Input() parent: (Patient & { id: string; selected: boolean }) | null = null;

  getUrl() {
    if (!this.parent?.id) {
      return undefined;
    }
    return `Condition?patient=${this.parent.id}`;
  }
}
