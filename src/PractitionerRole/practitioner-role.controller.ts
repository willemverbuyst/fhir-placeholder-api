import { Controller, Get } from '@nestjs/common';
import { Bundle, PractitionerRole } from 'fhir/r5';
import { PractitionerRoleService } from './practitioner-role.service';

@Controller('PractitionerRole')
export class PractitionerRoleController {
  constructor(
    private readonly practitionerRoleService: PractitionerRoleService,
  ) {}

  @Get()
  async findAll(): Promise<Bundle<PractitionerRole>> {
    return await this.practitionerRoleService.findAll();
  }
}
