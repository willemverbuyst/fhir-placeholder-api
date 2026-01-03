import { Controller, Get } from "@nestjs/common";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";

@Controller("AllergyIntolerance")
export class AllergyIntoleranceController {
  constructor(
    private readonly allergyIntoleranceService: AllergyIntoleranceService,
  ) {}

  @Get()
  findAll() {
    return this.allergyIntoleranceService.findAll();
  }
}
