import {
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
