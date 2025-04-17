import {
  createConditions,
  createEncounters,
  createEpisodes,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './createResources';

describe('createOrganizations', () => {
  it('should create the specified number of organizations', () => {
    const organizations = createOrganizations({ numberOfOrganizations: 5 });

    expect(organizations).toHaveLength(5);
    organizations.forEach((organization) => {
      expect(organization).toHaveProperty('id');
      expect(organization.resourceType).toBe('Organization');
    });
  });

  it('should return an empty array if numberOfOrganizations is 0', () => {
    const organizations = createOrganizations({ numberOfOrganizations: 0 });

    expect(organizations).toHaveLength(0);
  });
});

describe('createPractitioners', () => {
  it('should create the specified number of practitioners', () => {
    const practitioners = createPractitioners({ numberOfPractitioners: 5 });

    expect(practitioners).toHaveLength(5);
    practitioners.forEach((practitioner) => {
      expect(practitioner).toHaveProperty('id');
      expect(practitioner.resourceType).toBe('Practitioner');
    });
  });

  it('should return an empty array if numberOfPractitioners is 0', () => {
    const practitioners = createPractitioners({ numberOfPractitioners: 0 });

    expect(practitioners).toHaveLength(0);
  });
});

describe('createPatients', () => {
  const patients = createPatients({
    numberOfPatients: 8,
    numberOfOrganizations: 2,
    numberOfPractitioners: 4,
  });

  it.each`
    patientId      | organizationId      | practitionerId
    ${'patient-1'} | ${'organization-1'} | ${'practitioner-1'}
    ${'patient-2'} | ${'organization-1'} | ${'practitioner-1'}
    ${'patient-3'} | ${'organization-1'} | ${'practitioner-2'}
    ${'patient-4'} | ${'organization-1'} | ${'practitioner-2'}
    ${'patient-5'} | ${'organization-2'} | ${'practitioner-3'}
    ${'patient-6'} | ${'organization-2'} | ${'practitioner-3'}
    ${'patient-7'} | ${'organization-2'} | ${'practitioner-4'}
    ${'patient-8'} | ${'organization-2'} | ${'practitioner-4'}
  `(
    'should assign correct organization and practitioner to patient $patientId',
    ({ patientId, organizationId, practitionerId }) => {
      const patient = patients[patientId.slice(-1) - 1];

      expect(patient).toHaveProperty('id', patientId);
      expect(patient.resourceType).toBe('Patient');
      expect(patient.managingOrganization?.reference).toBe(
        `Organization/${organizationId}`,
      );

      patient.generalPractitioner?.forEach((practitionerRef: any) => {
        expect(practitionerRef.reference).toBe(
          `Practitioner/${practitionerId}`,
        );
      });
    },
  );

  it('should create the specified number of patients', () => {
    const patients = createPatients({
      numberOfPatients: 3,
      numberOfOrganizations: 1,
      numberOfPractitioners: 1,
    });

    expect(patients).toHaveLength(3);
  });

  it('should return an empty array if numberOfPatients is 0', () => {
    const patients = createPatients({
      numberOfPatients: 0,
      numberOfOrganizations: 1,
      numberOfPractitioners: 1,
    });

    expect(patients).toHaveLength(0);
  });
});

describe('createEncounters', () => {
  it('should create the specified number of encounters', () => {
    const numberOfEncounters = 3;
    const encountersPerPatient = 3;
    const episodesPerPatient = 1;
    const encounters = createEncounters(
      numberOfEncounters,
      encountersPerPatient,
      episodesPerPatient,
    );

    expect(encounters).toHaveLength(numberOfEncounters);
    encounters.forEach((encounter) => {
      expect(encounter).toHaveProperty('id');
      expect(encounter.resourceType).toBe('Encounter');
      expect(encounter.subject?.reference).toBe('Patient/patient-1');

      if (!encounter.episodeOfCare) {
        throw new Error('EpisodeOfCare is missing');
      }

      encounter.episodeOfCare.forEach((episodeRef) => {
        expect(episodeRef.reference?.split('/')[1]).toBe('episode-of-care-1');
      });
    });
  });

  it('should return an empty array if numberOfEncounters is 0', () => {
    const numberOfEncounters = 0;
    const encountersPerPatient = 1;
    const episodesPerPatient = 1;
    const encounters = createEncounters(
      numberOfEncounters,
      encountersPerPatient,
      episodesPerPatient,
    );

    expect(encounters).toHaveLength(0);
  });
});

describe('createConditions', () => {
  const conditions = createConditions({
    numberOfConditions: 4,
    numberOfPatients: 2,
  });

  it.each`
    conditionId      | patientId
    ${'condition-1'} | ${'patient-1'}
    ${'condition-2'} | ${'patient-1'}
    ${'condition-3'} | ${'patient-2'}
    ${'condition-4'} | ${'patient-2'}
  `(
    'should assign correct patient to condition $conditionId',
    ({ conditionId, patientId }) => {
      const condition = conditions[conditionId.slice(-1) - 1];

      expect(condition).toHaveProperty('id', conditionId);
      expect(condition.resourceType).toBe('Condition');
      expect(condition.subject?.reference).toBe(`Patient/${patientId}`);
    },
  );

  it('should create the specified number of conditions', () => {
    const conditions = createConditions({
      numberOfConditions: 4,
      numberOfPatients: 2,
    });

    expect(conditions).toHaveLength(4);
  });

  it('should return an empty array if numberOfConditions is 0', () => {
    const conditions = createConditions({
      numberOfConditions: 0,
      numberOfPatients: 2,
    });

    expect(conditions).toHaveLength(0);
  });
});

describe('createEpisodes', () => {
  const episodes = createEpisodes({
    numberOfEpisodes: 4,
    numberOfPatients: 2,
  });

  it.each`
    episodeId              | patientId
    ${'episode-of-care-1'} | ${'patient-1'}
    ${'episode-of-care-2'} | ${'patient-1'}
    ${'episode-of-care-3'} | ${'patient-2'}
    ${'episode-of-care-4'} | ${'patient-2'}
  `(
    'should assign correct patient to episode $episodeId',
    ({ episodeId, patientId }) => {
      const episode = episodes[episodeId.slice(-1) - 1];

      expect(episode).toHaveProperty('id', episodeId);
      expect(episode.resourceType).toBe('EpisodeOfCare');
      expect(episode.patient?.reference).toBe(`Patient/${patientId}`);
    },
  );

  it('should create episodes for the given patient and conditions', () => {
    const episodes = createEpisodes({
      numberOfEpisodes: 4,
      numberOfPatients: 2,
    });

    expect(episodes).toHaveLength(4);
  });

  it('should return an empty array if conditions are empty', () => {
    const episodes = createEpisodes({
      numberOfEpisodes: 0,
      numberOfPatients: 2,
    });

    expect(episodes).toHaveLength(0);
  });
});
