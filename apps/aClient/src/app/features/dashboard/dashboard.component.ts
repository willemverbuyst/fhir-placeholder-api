import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResourcesService } from '../../core/services/resources.service';
import { AppFhirResource } from '../../types';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public resourcesCount: Record<
    AppFhirResource['resourceType'],
    number
  > | null = null;

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService.getResourcesCount().subscribe((data) => {
      this.resourcesCount = data;
    });
  }
}
