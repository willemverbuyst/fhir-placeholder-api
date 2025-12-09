import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Organization, PractitionerRole } from 'fhir/r5';
import { ResourcesService } from '../../core/services/resources.service';
import { PatientComponent } from './patient/patient.component';

@Component({
  selector: 'app-graph',
  imports: [MatButtonModule, CommonModule, PatientComponent],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent {
  organizations: { id: string }[] = [];
  practitionerRoles: {
    id: string;
    organizationId: string;
    practitionerId: string;
  }[] = [];
  practitioners: { id: string; practitionerRoleId: string }[] = [];
  organizationId = '';
  practitionerRoleId = '';
  practitionerId = '';
  patientId = '';

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService.getResources('Organization').subscribe((data) => {
      for (const entry of data.entry || []) {
        const id = (entry.resource as Organization).id;
        if (id) {
          this.organizations.push({ id });
        }
      }
    });
  }

  onOrganizationClick(organizationId: string): void {
    this.practitionerRoles = [];
    this.practitioners = [];
    if (organizationId === this.organizationId) {
      this.organizationId = '';
    } else {
      this.organizationId = organizationId;

      this.resourcesService
        .getResources(`PractitionerRole?organization=${organizationId}`)
        .subscribe((data) => {
          for (const entry of data.entry || []) {
            const id = (entry.resource as Organization).id;
            if (id) {
              this.practitionerRoles.push({
                id,
                organizationId,
                practitionerId: (
                  entry.resource as PractitionerRole
                ).practitioner?.reference?.replace(
                  'Practitioner/',
                  ''
                ) as string,
              });
            }
          }
        });
    }
  }

  onPractitionerRoleClick(practitionerRoleId: string): void {
    this.practitioners = [];
    if (practitionerRoleId === this.practitionerRoleId) {
      this.practitionerRoleId = '';
    } else {
      this.practitionerRoleId = practitionerRoleId;
      const practitionerId = this.practitionerRoles.find(
        (pr) => pr.id === practitionerRoleId
      )?.practitionerId;
      this.resourcesService
        .getResources(`Practitioner/${practitionerId}`)
        .subscribe((data) => {
          const id = data?.id;
          if (id) {
            this.practitioners.push({
              id,
              practitionerRoleId,
            });
          }
        });
    }
  }

  onPractitionerClick(practitionerId: string): void {
    if (practitionerId === this.practitionerId) {
      this.practitionerId = '';
    } else {
      this.practitionerId = practitionerId;
    }
  }
}
