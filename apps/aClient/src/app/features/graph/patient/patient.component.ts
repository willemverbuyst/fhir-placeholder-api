import { Component, Input } from '@angular/core';
import { Practitioner } from 'fhir/r5';
import { AppointmentComponent } from '../appointment/appointment.component';
import { ConditionComponent } from '../condition/condition.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'patient-resource',
  imports: [
    ResourceRendererComponent,
    AppointmentComponent,
    ConditionComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  @Input() parent: (Practitioner & { id: string; selected: boolean }) | null =
    null;

  getUrl() {
    if (!this.parent) {
      return undefined;
    }
    return `Patient?general-practitioner=${this.parent.id}`;
  }
}
