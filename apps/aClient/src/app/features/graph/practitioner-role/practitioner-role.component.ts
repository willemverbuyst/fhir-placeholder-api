import { Component, Input } from '@angular/core';
import { Organization } from 'fhir/r5';
import { PractitionerComponent } from '../practitioner/practitioner.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'practitioner-role-resource',
  imports: [ResourceRendererComponent, PractitionerComponent],
  templateUrl: './practitioner-role.component.html',
  styleUrl: './practitioner-role.component.scss',
})
export class PractitionerRoleComponent {
  @Input() parent: (Organization & { id: string; selected: boolean }) | null =
    null;

  getUrl() {
    if (!this.parent?.id) {
      return undefined;
    }
    return `PractitionerRole?organization=${this.parent.id}`;
  }
}
