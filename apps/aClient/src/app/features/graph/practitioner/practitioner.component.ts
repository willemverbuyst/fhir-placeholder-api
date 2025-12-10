import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ResourcesService } from "../../../core/services/resources.service";
import { PatientComponent } from "../patient/patient.component";

@Component({
  selector: "practitioner-resource",
  imports: [MatButtonModule, PatientComponent],
  templateUrl: "./practitioner.component.html",
  styleUrl: "./practitioner.component.scss",
})
export class PractitionerComponent {
  practitionerId = input("");
  practitioners: { id: string }[] = [];
  practitionerIdForPatient = "";

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

  onPractitionerClick(practitionerId: string): void {
    if (practitionerId === this.practitionerIdForPatient) {
      this.practitionerIdForPatient = "";
    } else {
      this.practitionerIdForPatient = practitionerId;
    }
  }
}
