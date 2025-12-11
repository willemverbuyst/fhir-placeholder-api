import { Component, input } from '@angular/core';
import { Appointment } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';
import { ResourceItemComponent } from '../resource-item/resource-item.component';

@Component({
  selector: 'appointment-resource',
  imports: [ResourceItemComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  patientId = input('');
  appointments: { id: string; selected?: boolean }[] = [];

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
