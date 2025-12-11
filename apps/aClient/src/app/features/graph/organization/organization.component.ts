import { Component } from "@angular/core";
import { Organization } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { PractitionerRoleComponent } from "../practitioner-role/practitioner-role.component";
import { ResourceItemComponent } from "../resource-item/resource-item.component";

@Component({
  selector: "organization-resource",
  imports: [ResourceItemComponent, PractitionerRoleComponent],
  templateUrl: "./organization.component.html",
  styleUrl: "./organization.component.scss",
})
export class OrganizationComponent {
  organizations: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService.getResources("Organization").subscribe((data) => {
      for (const entry of data.entry || []) {
        const id = (entry.resource as Organization).id;
        if (id) {
          this.organizations.push({ id });
        }
      }
    });
  }
}
