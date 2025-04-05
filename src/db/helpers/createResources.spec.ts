import { Patient } from 'fhir/r5';
import {
  createEpisodesForPatients,
  createEpisodesWithConditions,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './createResources';

describe('createPatients', () => {
  it('should create the specified number of patients', () => {
    const numberOfPatients = 3;
    const organizationId = 'org-123';
    const practitionerIds = ['pract-1', 'pract-2'];

    const patients = createPatients(
      numberOfPatients,
      organizationId,
      practitionerIds,
    );

    expect(patients).toHaveLength(numberOfPatients);
    patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient.managingOrganization?.reference).toBe(
        `Organization/${organizationId}`,
      );

      if (!patient.generalPractitioner) {
        throw new Error('General Practitioner is missing');
      }

      expect(practitionerIds).toContain(
        patient.generalPractitioner[0]?.reference?.split('/')[1],
      );
    });
  });

  it('should return an empty array if numberOfPatients is 0', () => {
    const numberOfPatients = 0;
    const organizationId = 'org-123';
    const practitionerIds = ['pract-1', 'pract-2'];

    const patients = createPatients(
      numberOfPatients,
      organizationId,
      practitionerIds,
    );

    expect(patients).toHaveLength(0);
  });

  it('should throw an error if practitionerIds is empty', () => {
    const numberOfPatients = 3;
    const organizationId = 'org-123';
    const practitionerIds: string[] = [];

    expect(() =>
      createPatients(numberOfPatients, organizationId, practitionerIds),
    ).toThrow();
  });
});

describe('createOrganizations', () => {
  it('should create the specified number of organizations', () => {
    const numberOfOrganizations = 5;

    const organizations = createOrganizations(numberOfOrganizations);

    expect(organizations).toHaveLength(numberOfOrganizations);
    organizations.forEach((organization) => {
      expect(organization).toHaveProperty('id');
      expect(organization.resourceType).toBe('Organization');
    });
  });

  it('should return an empty array if numberOfOrganizations is 0', () => {
    const numberOfOrganizations = 0;

    const organizations = createOrganizations(numberOfOrganizations);

    expect(organizations).toHaveLength(0);
  });
});

describe('createEpisodesWithConditions', () => {
  it('should create the specified number of episodes and conditions', () => {
    const numberOfEpisodes = 3;
    const patientId = 'patient-123';

    const { newConditions, newEpisodes } = createEpisodesWithConditions(
      numberOfEpisodes,
      patientId,
    );

    expect(newConditions).toHaveLength(numberOfEpisodes);
    expect(newEpisodes).toHaveLength(numberOfEpisodes);

    newConditions.forEach((condition) => {
      expect(condition).toHaveProperty('id');
      expect(condition.subject?.reference).toBe(`Patient/${patientId}`);
    });

    newEpisodes.forEach((episode, index) => {
      expect(episode).toHaveProperty('id');
      expect(episode.patient?.reference).toBe(`Patient/${patientId}`);

      if (!episode.diagnosis) {
        throw new Error('Diagnosis is missing in createEpisodesWithConditions');
      }

      if (!episode.diagnosis[0]?.condition) {
        throw new Error('Condition is missing in createEpisodesWithConditions');
      }

      expect(episode.diagnosis[0]?.condition[0].reference?.reference).toBe(
        `Condition/${newConditions[index].id}`,
      );
    });
  });

  it('should throw an error if a condition ID is missing', () => {
    const numberOfEpisodes = 1;
    const patientId = 'patient-123';

    jest
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .spyOn(require('../resources/condition'), 'createCondition')
      .mockReturnValueOnce({
        id: undefined,
        resourceType: 'Condition',
        subject: { reference: `Patient/${patientId}` },
      });

    expect(() =>
      createEpisodesWithConditions(numberOfEpisodes, patientId),
    ).toThrow('Condition ID is missing in createEpisodesWithConditions');
  });
});

describe('createEpisodesForPatients', () => {
  it('should create the specified number of episodes and conditions for each patient', () => {
    const patients: Patient[] = [
      { id: 'patient-1', resourceType: 'Patient' },
      { id: 'patient-2', resourceType: 'Patient' },
    ];
    const numberOfEpisodes = 2;

    const { newConditions, newEpisodes } = createEpisodesForPatients(
      patients,
      numberOfEpisodes,
    );

    expect(newConditions).toHaveLength(patients.length * numberOfEpisodes);
    expect(newEpisodes).toHaveLength(patients.length * numberOfEpisodes);

    patients.forEach((patient) => {
      const patientConditions = newConditions.filter(
        (condition) => condition.subject?.reference === `Patient/${patient.id}`,
      );
      const patientEpisodes = newEpisodes.filter(
        (episode) => episode.patient?.reference === `Patient/${patient.id}`,
      );

      expect(patientConditions).toHaveLength(numberOfEpisodes);
      expect(patientEpisodes).toHaveLength(numberOfEpisodes);

      patientEpisodes.forEach((episode, index) => {
        if (!episode.diagnosis) {
          throw new Error('Diagnosis is missing in createEpisodesForPatients');
        }

        if (!episode.diagnosis[0]?.condition) {
          throw new Error('Condition is missing in createEpisodesForPatients');
        }

        expect(episode.diagnosis[0].condition[0].reference?.reference).toBe(
          `Condition/${patientConditions[index].id}`,
        );
      });
    });
  });

  it('should return empty arrays if no patients are provided', () => {
    const patients: Patient[] = [];
    const numberOfEpisodes = 3;

    const { newConditions, newEpisodes } = createEpisodesForPatients(
      patients,
      numberOfEpisodes,
    );

    expect(newConditions).toHaveLength(0);
    expect(newEpisodes).toHaveLength(0);
  });

  it('should throw an error if a patient ID is missing', () => {
    const patients = [{ id: undefined, resourceType: 'Patient' } as Patient];
    const numberOfEpisodes = 2;

    expect(() => createEpisodesForPatients(patients, numberOfEpisodes)).toThrow(
      'Patient ID is missing in createEpisodesForPatients',
    );
  });
});

describe('createPractitioners', () => {
  it('should create the specified number of practitioners', () => {
    const numberOfPractitioners = 4;

    const practitioners = createPractitioners(numberOfPractitioners);

    expect(practitioners).toHaveLength(numberOfPractitioners);
    practitioners.forEach((practitioner) => {
      expect(practitioner).toHaveProperty('id');
      expect(practitioner.resourceType).toBe('Practitioner');
    });
  });

  it('should return an empty array if numberOfPractitioners is 0', () => {
    const numberOfPractitioners = 0;

    const practitioners = createPractitioners(numberOfPractitioners);

    expect(practitioners).toHaveLength(0);
  });
});
