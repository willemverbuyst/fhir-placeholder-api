import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { PractitionerRole } from "fhir/r5";
import { ResourcesService } from "../../../core/services/resources.service";
import { PractitionerComponent } from "../practitioner/practitioner.component";

@Component({
  selector: "practitioner-role-resource",
  imports: [MatButtonModule, PractitionerComponent],
  templateUrl: "./practitioner-role.component.html",
  styleUrl: "./practitioner-role.component.scss",
})
export class PractitionerRoleComponent {
  practitionerRoles: {
    id: string;
    practitionerId: string;
  }[] = [];
  organizationId = input("");
  practitionerRoleId = "";
  practitionerId = "";

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

  onPractitionerRoleClick(practitionerRoleId: string): void {
    if (practitionerRoleId === this.practitionerRoleId) {
      this.practitionerRoleId = "";
      this.practitionerId = "";
    } else {
      this.practitionerRoleId = practitionerRoleId;
      const practitionerId = this.practitionerRoles.find(
        (pr) => pr.id === practitionerRoleId,
      )?.practitionerId;

      this.practitionerId = practitionerId ?? "";
    }
  }
}
