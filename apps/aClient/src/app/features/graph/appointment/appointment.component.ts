import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';

@Component({
  selector: 'appointment-resource',
  imports: [MatButtonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  patientId = input('');
  appointments: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Appointment?patient=${this.patientId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Appointment).id;
          if (id) {
            this.appointments.push({ id });
          }
        }
      });
  }
}
