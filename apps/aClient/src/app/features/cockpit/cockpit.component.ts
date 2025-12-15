import { Component } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AppFhirResource } from '../../types';

@Component({
  selector: 'app-cockpit',
  imports: [MatTabGroup, MatTab],
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.scss',
})
export class CockpitComponent {
  public tabLabels: AppFhirResource['resourceType'][] = [
    'Appointment',
    'Condition',
    'Encounter',
    'EpisodeOfCare',
    'Observation',
    'Organization',
    'Patient',
    'Practitioner',
    'PractitionerRole',
  ];

  public onTabChange(event: MatTabChangeEvent): void {
    const resourceType = this.tabLabels[event.index];
    console.log(`Switched to tab: ${resourceType}`);
  }
}
