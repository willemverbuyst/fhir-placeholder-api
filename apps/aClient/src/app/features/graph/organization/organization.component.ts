import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Organization } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { PractitionerRoleComponent } from "../practitioner-role/practitioner-role.component";

@Component({
  selector: "organization-resource",
  imports: [MatButtonModule, PractitionerRoleComponent],
  templateUrl: "./organization.component.html",
  styleUrl: "./organization.component.scss",
})
export class OrganizationComponent {
  organizations: { id: string }[] = [];
  organizationId = "";

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

  onOrganizationClick(organizationId: string): void {
    if (organizationId === this.organizationId) {
      this.organizationId = "";
    } else {
      this.organizationId = organizationId;
    }
  }
}
