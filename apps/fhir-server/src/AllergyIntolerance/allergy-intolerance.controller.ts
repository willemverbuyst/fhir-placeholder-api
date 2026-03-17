import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";
import { allergyIntoleranceBundleExample } from "./examples/allergy-intolerance-bundle.example";

@Controller("AllergyIntolerance")
export class AllergyIntoleranceController {
  constructor(
    private readonly allergyIntoleranceService: AllergyIntoleranceService,
  ) {}

  @ApiOkResponse({
    description: "All allergies",
    example: allergyIntoleranceBundleExample,
  })
  @Get()
  findAll() {
    return this.allergyIntoleranceService.findAll();
  }
}
