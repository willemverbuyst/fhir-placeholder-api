import { Condition, EpisodeOfCare, Organization, Practitioner } from 'fhir/r5';
import { Id } from 'src/types';
import {
  createConditions,
  createEncounters,
  createEpisodes,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './createResources';

describe('createEncounters', () => {
  it('should create the specified number of encounters', () => {
    const numberOfEncounters = 3;
    const patientId = 'patient-123';
    const episodes: (EpisodeOfCare & Id)[] = [
      {
        id: 'episode-1',
        resourceType: 'EpisodeOfCare',
        status: 'active',
        patient: { reference: `Patient/${patientId}` },
      },
      {
        id: 'episode-2',
        resourceType: 'EpisodeOfCare',
        status: 'active',
        patient: { reference: `Patient/${patientId}` },
      },
    ];
    const encounters = createEncounters(
      numberOfEncounters,
      patientId,
      episodes,
    );

    expect(encounters).toHaveLength(numberOfEncounters);
    encounters.forEach((encounter) => {
      expect(encounter).toHaveProperty('id');
      expect(encounter.resourceType).toBe('Encounter');
      expect(encounter.subject?.reference).toBe(`Patient/${patientId}`);

      if (!encounter.episodeOfCare) {
        throw new Error('EpisodeOfCare is missing');
      }

      encounter.episodeOfCare.forEach((episodeRef) => {
        expect(episodes.map((e) => e.id)).toContain(
          episodeRef.reference?.split('/')[1],
        );
      });
    });
  });

  it('should return an empty array if numberOfEncounters is 0', () => {
    const numberOfEncounters = 0;
    const patientId = 'patient-123';
    const episodes: (EpisodeOfCare & Id)[] = [
      {
        id: 'episode-1',
        resourceType: 'EpisodeOfCare',
        status: 'active',
        patient: { reference: `Patient/${patientId}` },
      },
      {
        id: 'episode-2',
        resourceType: 'EpisodeOfCare',
        status: 'active',
        patient: { reference: `Patient/${patientId}` },
      },
    ];
    const encounters = createEncounters(
      numberOfEncounters,
      patientId,
      episodes,
    );

    expect(encounters).toHaveLength(0);
  });
});

describe('createPatients', () => {
  it('should create the specified number of patients', () => {
    const numberOfPatients = 3;
    const organizations: (Organization & Id)[] = [
      { id: 'organization-1', resourceType: 'Organization' },
      { id: 'organization-2', resourceType: 'Organization' },
    ];
    const practitioners: (Practitioner & Id)[] = [
      { id: 'practitioner-1', resourceType: 'Practitioner' },
      { id: 'practitioner-2', resourceType: 'Practitioner' },
    ];

    const patients = createPatients(
      numberOfPatients,
      organizations,
      practitioners,
    );

    expect(patients).toHaveLength(numberOfPatients);
    patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient.resourceType).toBe('Patient');
      expect(patient.managingOrganization?.reference).toBe(
        `Organization/${organizations[0].id}`,
      );
      if (patient.generalPractitioner) {
        patient.generalPractitioner.forEach((practitionerRef) => {
          expect(practitioners.map((p) => p.id)).toContain(
            practitionerRef.reference?.split('/')[1],
          );
        });
      }
    });
  });

  it('should return an empty array if numberOfPatients is 0', () => {
    const numberOfPatients = 0;
    const organizations: (Organization & Id)[] = [
      { id: 'organization-1', resourceType: 'Organization' },
    ];
    const practitioners: (Practitioner & Id)[] = [
      { id: 'practitioner-1', resourceType: 'Practitioner' },
    ];

    const patients = createPatients(
      numberOfPatients,
      organizations,
      practitioners,
    );

    expect(patients).toHaveLength(0);
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

describe('createConditions', () => {
  it('should create the specified number of conditions', () => {
    const numberOfConditions = 3;
    const patientId = 'patient-123';

    const conditions = createConditions(numberOfConditions, patientId);

    expect(conditions).toHaveLength(numberOfConditions);
    conditions.forEach((condition) => {
      expect(condition).toHaveProperty('id');
      expect(condition.resourceType).toBe('Condition');
      expect(condition.subject?.reference).toBe(`Patient/${patientId}`);
    });
  });

  it('should return an empty array if numberOfConditions is 0', () => {
    const numberOfConditions = 0;
    const patientId = 'patient-123';

    const conditions = createConditions(numberOfConditions, patientId);

    expect(conditions).toHaveLength(0);
  });
});

describe('createEpisodes', () => {
  it('should create episodes for the given patient and conditions', () => {
    const patientId = 'patient-123';
    const conditions: (Condition & Id)[] = [
      {
        id: 'condition-1',
        resourceType: 'Condition',
        clinicalStatus: {},
        subject: { reference: `Patient/${patientId}` },
      },
      {
        id: 'condition-2',
        resourceType: 'Condition',
        clinicalStatus: {},
        subject: { reference: `Patient/${patientId}` },
      },
    ];

    const episodes = createEpisodes(patientId, conditions);

    expect(episodes).toHaveLength(conditions.length);
    episodes.forEach((episode) => {
      expect(episode).toHaveProperty('id');
      expect(episode.resourceType).toBe('EpisodeOfCare');
      expect(episode.patient?.reference).toBe(`Patient/${patientId}`);
    });
  });

  it('should return an empty array if conditions are empty', () => {
    const patientId = 'patient-123';
    const conditions: (Condition & Id)[] = [];

    const episodes = createEpisodes(patientId, conditions);

    expect(episodes).toHaveLength(0);
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
