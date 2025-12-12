import { Component } from '@angular/core';
import { OrganizationComponent } from './organization/organization.component';

@Component({
  selector: 'app-graph',
  imports: [OrganizationComponent],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent {}
