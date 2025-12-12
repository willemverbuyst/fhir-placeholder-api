import { Component, Input } from '@angular/core';
import { PractitionerRole } from 'fhir/r5';
import { PatientComponent } from '../patient/patient.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'practitioner-resource',
  imports: [ResourceRendererComponent, PatientComponent],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.scss',
})
export class PractitionerComponent {
  @Input() parent:
    | (PractitionerRole & { id: string; selected: boolean })
    | null = null;

  getUrl() {
    if (!this.parent?.practitioner?.reference?.split('/')[1]) {
      return undefined;
    }
    return `Practitioner/${this.parent.practitioner?.reference?.split('/')[1]}`;
  }
}
