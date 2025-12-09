import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { ConditionComponent } from '../condition/condition.component';

@Component({
  selector: 'patient-resource',
  imports: [MatButtonModule, AppointmentComponent, ConditionComponent],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  practitionerId = input('');
  patientId = '';
  patients: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Patient?general-practitioner=${this.practitionerId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Patient).id;
          if (id) {
            this.patients.push({ id });
          }
        }
      });
  }

  onPatientClick(patientId: string): void {
    if (patientId === this.patientId) {
      this.patientId = '';
    } else {
      this.patientId = patientId;
    }
  }
}
