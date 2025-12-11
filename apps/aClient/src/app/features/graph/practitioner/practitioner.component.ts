import { Component, input } from "@angular/core";
import { ResourcesService } from "../../../core/services/resources.service";
import { PatientComponent } from "../patient/patient.component";
import { ResourceItemComponent } from "../resource-item/resource-item.component";

@Component({
  selector: "practitioner-resource",
  imports: [ResourceItemComponent, PatientComponent],
  templateUrl: "./practitioner.component.html",
  styleUrl: "./practitioner.component.scss",
})
export class PractitionerComponent {
  practitionerId = input("");
  practitioners: { id: string }[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .getResources(`Practitioner/${this.practitionerId()}`)
      .subscribe((data) => {
        const id = data?.id;
        if (id) {
          this.practitioners.push({ id });
        }
      });
  }
}
