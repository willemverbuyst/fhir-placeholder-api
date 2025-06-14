import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { AppointmentService } from "./appointment.service";

describe("AppointmentService", () => {
  let service: AppointmentService;
  const mockDataStore = {
    appointments: [
      {
        id: "1",
        resourceType: "Appointment",
        subject: {
          reference: "Patient/1",
        },
      },
      {
        id: "2",
        resourceType: "Appointment",
        subject: {
          reference: "Patient/2",
        },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
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
