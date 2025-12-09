import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Condition } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';

@Component({
  selector: 'condition-resource',
  imports: [MatButtonModule],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.scss',
})
export class ConditionComponent {
  patientId = input('');
  conditions: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Condition?patient=${this.patientId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as Condition).id;
          if (id) {
            this.conditions.push({ id });
          }
        }
      });
  }
}
