import { Component, Input } from '@angular/core';
import { Patient } from 'fhir/r5';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'appointment-resource',
  imports: [ResourceRendererComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  @Input() parent: (Patient & { id: string; selected: boolean }) | null = null;

  getUrl() {
    if (this.parent?.id) {
      return `Appointment?patient=${this.parent.id}`;
    }
    return undefined;
  }
}
