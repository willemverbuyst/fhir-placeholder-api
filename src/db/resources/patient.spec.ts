import { START_DATE } from '../dataStore.config';
import { createPatient } from './patient';

describe('createPatient', () => {
  it('should create a Patient with a valid structure', () => {
    const organizationId = '12345';
    const practitionerIds = ['67890'];
    const patient = createPatient(organizationId, practitionerIds);

    expect(patient).toHaveProperty('id');
    expect(patient).toHaveProperty('resourceType', 'Patient');
    expect(patient).toHaveProperty('name');
    expect(patient.name).toBeInstanceOf(Array);

    if (!patient.name) {
      throw new Error('Patient name array is empty');
    }

    expect(patient.name[0]).toHaveProperty('family');
    expect(patient.name[0]).toHaveProperty('given');
    expect(patient.name[0].given).toBeInstanceOf(Array);
    expect(patient).toHaveProperty('birthDate');
    expect(patient).toHaveProperty('gender');
    expect(['male', 'female', 'other', 'unknown']).toContain(patient.gender);
    expect(patient).toHaveProperty('contact');

    if (!patient.contact) {
      throw new Error('Patient contact array is empty');
    }
    expect(patient.contact[0]).toHaveProperty('telecom');
    expect(patient.contact[0].telecom).toBeInstanceOf(Array);
    expect(patient.contact[0]).toHaveProperty('address');

    expect(patient).toHaveProperty('managingOrganization');
    expect(patient.managingOrganization).toHaveProperty('reference');

    if (!patient.managingOrganization) {
      throw new Error('Patient managingOrganization reference is undefined');
    }

    expect(patient.managingOrganization.reference).toBe(
      `Organization/${organizationId}`,
    );
    expect(patient).toHaveProperty('generalPractitioner');
    expect(patient.generalPractitioner).toBeInstanceOf(Array);

    if (!patient.generalPractitioner) {
      throw new Error('Patient generalPractitioner array is empty');
    }

    expect(patient.generalPractitioner[0]).toHaveProperty('reference');
    expect(patient.generalPractitioner[0].reference).toBe(
      `Practitioner/${practitionerIds[0]}`,
    );
    expect(patient).toHaveProperty('communication');
    expect(patient.communication).toBeInstanceOf(Array);

    if (!patient.communication) {
      throw new Error('Patient communication array is empty');
    }

    expect(patient.communication[0]).toHaveProperty('language');
    expect(patient.communication[0].language).toHaveProperty('coding');
    expect(patient.communication[0].language.coding).toBeInstanceOf(Array);
    expect(patient.communication[0]).toHaveProperty('preferred');
    expect(patient.communication[0].preferred).toBe(true);
  });

  it('should generate a unique id for each Patient', () => {
    const organizationId = '12345';
    const practitionerIds = ['67890'];

    const patient1 = createPatient(organizationId, practitionerIds);
    const patient2 = createPatient(organizationId, practitionerIds);

    expect(patient1.id).not.toEqual(patient2.id);
  });

  it('should generate a valid birthDate within the specified range', () => {
    const organizationId = '12345';
    const practitionerIds = ['67890'];
    const patient = createPatient(organizationId, practitionerIds);

    if (!patient.birthDate) {
      throw new Error('Patient birthDate is undefined');
    }
    const birthDate = new Date(patient.birthDate);
    const startDate = new Date(START_DATE);
    const now = new Date();

    expect(birthDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(birthDate.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it('should create telecom entries with valid email and phone', () => {
    const organizationId = '12345';
    const practitionerIds = ['67890'];
    const patient = createPatient(organizationId, practitionerIds);

    if (!patient.contact) {
      throw new Error('Patient contact array is undefined');
    }

    if (!patient.contact[0].telecom) {
      throw new Error('Patient telecom array in contact is undefine');
    }

    const email = patient.contact[0].telecom.find((t) => t.system === 'email');
    const phone = patient.contact[0].telecom.find((t) => t.system === 'phone');

    expect(email).toBeDefined();
    expect(email).toHaveProperty('value');
    expect(phone).toBeDefined();
    expect(phone).toHaveProperty('value');
  });

  it('should create a valid address', () => {
    const organizationId = '12345';
    const practitionerIds = ['67890'];
    const patient = createPatient(organizationId, practitionerIds);

    if (!patient.contact) {
      throw new Error('Patient contact array is undefined');
    }

    if (!patient.contact[0].address) {
      throw new Error('Patient address in contact array is undefined');
    }

    expect(patient.contact[0].address).toHaveProperty('line');
    expect(patient.contact[0].address).toHaveProperty('city');
    expect(patient.contact[0].address).toHaveProperty('state');
    expect(patient.contact[0].address).toHaveProperty('postalCode');
    expect(patient.contact[0].address).toHaveProperty('country');
  });
});
