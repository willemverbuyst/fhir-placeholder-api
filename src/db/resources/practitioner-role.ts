import { PractitionerRole } from 'fhir/r5';
import { Id } from '../../types';

export function createPractitionerRole(
  id: string,
  organizationId: string,
  practitionerId: string,
): PractitionerRole & Id {
  return {
    id,
    resourceType: 'PractitionerRole',
    organization: { reference: `Organization/${organizationId}` },
    practitioner: { reference: `Practitioner/${practitionerId}` },
  };
}
