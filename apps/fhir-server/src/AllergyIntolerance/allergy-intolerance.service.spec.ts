import type { AllergyIntolerance } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";

describe("AllergyIntoleranceService", () => {
  let service: AllergyIntoleranceService;
  let repoMock: Pick<DataStoreService, "allergies">;

  beforeEach(() => {
    repoMock = {
      allergies: [
        {
          id: "1",
          resourceType: "AllergyIntolerance",
        } as AllergyIntolerance,
      ],
    };

    service = new AllergyIntoleranceService(
      repoMock as DataStoreService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
