import { Component } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-cockpit',
  imports: [MatTabGroup, MatTab],
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.scss',
})
export class CockpitComponent {
  public tabLabels = [
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
    console.log('Selected tab label: ', event.tab.textLabel);
  }
}
