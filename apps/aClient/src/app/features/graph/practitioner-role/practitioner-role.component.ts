import { Component, input } from "@angular/core";
import { PractitionerRole } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { PractitionerComponent } from "../practitioner/practitioner.component";
import { ResourceItemComponent } from "../resource-item/resource-item.component";

@Component({
  selector: "practitioner-role-resource",
  imports: [ResourceItemComponent, PractitionerComponent],
  templateUrl: "./practitioner-role.component.html",
  styleUrl: "./practitioner-role.component.scss",
})
export class PractitionerRoleComponent {
  practitionerRoles: {
    id: string;
    practitionerId: string;
  }[] = [];
  organizationId = input("");

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`PractitionerRole?organization=${this.organizationId()}`)
      .subscribe((data) => {
        for (const entry of data.entry || []) {
          const id = (entry.resource as PractitionerRole).id;
          if (id) {
            this.practitionerRoles.push({
              id,
              practitionerId: (
                entry.resource as PractitionerRole
              ).practitioner?.reference?.replace("Practitioner/", "") as string,
            });
          }
        }
      });
  }
}
