import { Component } from '@angular/core';
import { PractitionerRoleComponent } from '../practitioner-role/practitioner-role.component';
import { ResourceRendererComponent } from '../resource-renderer/resource-renderer.component';

@Component({
  selector: 'organization-resource',
  imports: [ResourceRendererComponent, PractitionerRoleComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {
  getUrl() {
    return 'Organization';
  }
}
