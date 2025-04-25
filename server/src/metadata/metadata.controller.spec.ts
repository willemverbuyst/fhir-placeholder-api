import { Test, TestingModule } from "@nestjs/testing";
import { MetadataController } from "./metadata.controller";

describe("MetadataController", () => {
  let controller: MetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataController],
      providers: [],
    }).compile();

    controller = module.get<MetadataController>(MetadataController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getMetadata", () => {
    it("should return metadata", () => {
      const metadata = controller.getCapabilityStatement();

      expect(metadata).toHaveProperty("resourceType", "CapabilityStatement");
      expect(metadata).toHaveProperty("id", "capability-statement-api-v2-5r");
      expect(metadata).toHaveProperty("status", "active");
      expect(metadata).toHaveProperty("date", "2025-04-08");
      expect(metadata).toHaveProperty("kind", "instance");
      expect(metadata).toHaveProperty("fhirVersion", "5.0.0");
      expect(metadata).toHaveProperty("format", ["json"]);
      expect(metadata).toHaveProperty("rest");
      expect(metadata.rest).toBeInstanceOf(Array);
    });
  });
});
