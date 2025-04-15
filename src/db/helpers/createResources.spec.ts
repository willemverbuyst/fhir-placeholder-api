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

describe('createPatients', () => {
  it('should create the specified number of patients', () => {
    const numberOfPatients = 3;
    const numberOfOrganizations = 1;
    const numberOfPractitioners = 1;
    const patients = createPatients(
      numberOfPatients,
      numberOfOrganizations,
      numberOfPractitioners,
    );

    expect(patients).toHaveLength(numberOfPatients);
    patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient.resourceType).toBe('Patient');
      expect(patient.managingOrganization?.reference).toBe(
        'Organization/organization-1',
      );
      if (patient.generalPractitioner) {
        patient.generalPractitioner.forEach((practitionerRef) => {
          expect(practitionerRef.reference?.split('/')[1]).toBe(
            'practitioner-1',
          );
        });
      }
    });
  });

  it('should return an empty array if numberOfPatients is 0', () => {
    const numberOfPatients = 0;
    const numberOfOrganizations = 1;
    const numberOfPractitioners = 1;
    const patients = createPatients(
      numberOfPatients,
      numberOfOrganizations,
      numberOfPractitioners,
    );

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
  it('should create the specified number of conditions', () => {
    const numberOfConditions = 3;
    const conditionsPerPatient = 3;
    const conditions = createConditions(
      numberOfConditions,
      conditionsPerPatient,
    );

    expect(conditions).toHaveLength(numberOfConditions);
    conditions.forEach((condition) => {
      expect(condition).toHaveProperty('id');
      expect(condition.resourceType).toBe('Condition');
      expect(condition.subject?.reference).toBe('Patient/patient-1');
    });
  });

  it('should return an empty array if numberOfConditions is 0', () => {
    const numberOfConditions = 0;
    const conditionsPerPatient = 3;
    const conditions = createConditions(
      numberOfConditions,
      conditionsPerPatient,
    );

    expect(conditions).toHaveLength(0);
  });
});

describe('createEpisodes', () => {
  it('should create episodes for the given patient and conditions', () => {
    const numberOfEpisodes = 4;
    const episodesPerPatient = 4;
    const episodes = createEpisodes(numberOfEpisodes, episodesPerPatient);

    expect(episodes).toHaveLength(4);
    episodes.forEach((episode) => {
      expect(episode).toHaveProperty('id');
      expect(episode.resourceType).toBe('EpisodeOfCare');
      expect(episode.patient?.reference).toBe('Patient/patient-1');
    });
  });

  it('should return an empty array if conditions are empty', () => {
    const numberOfEpisodes = 0;
    const episodesPerPatient = 4;
    const episodes = createEpisodes(numberOfEpisodes, episodesPerPatient);

    expect(episodes).toHaveLength(0);
  });
});
