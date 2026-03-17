import type { Appointment } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { AppointmentService } from "./appointment.service";

describe("AppointmentService", () => {
  let service: AppointmentService;
  let repoMock: Pick<DataStoreService, "appointments">;

  beforeEach(() => {
    repoMock = {
      appointments: [
        {
          id: "1",
          resourceType: "Appointment",
          subject: {
            reference: "Patient/1",
          },
        } as Appointment,
        {
          id: "2",
          resourceType: "Appointment",
          subject: {
            reference: "Patient/2",
          },
        } as Appointment,
      ],
    };

    service = new AppointmentService(
      repoMock as DataStoreService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all appointments in a Bundle", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all appointments filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });
  });
});
