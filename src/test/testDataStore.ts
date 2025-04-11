export const testDataStore = {
  patients: [
    {
      id: '1',
      resourceType: 'Patient',
      managingOrganization: {
        reference: 'Organization/1',
      },
      generalPractitioner: [
        {
          reference: 'Practitioner/1',
        },
      ],
    },
    {
      id: '2',
      resourceType: 'Patient',
    },
  ],
  episodes: [
    {
      id: '1',
      resourceType: 'EpisodeOfCare',
      status: 'active',
      patient: { reference: 'Patient/1' },
    },
    {
      id: '2',
      resourceType: 'EpisodeOfCare',
      status: 'active',
      patient: { reference: 'Patient/2' },
    },
    {
      id: '3',
      resourceType: 'EpisodeOfCare',
      status: 'active',
      patient: { reference: 'Patient/1' },
    },
  ],
  organizations: [
    {
      id: '1',
      resourceType: 'Organization',
      name: 'test organization',
    },
    {
      id: '2',
      resourceType: 'Organization',
      name: 'another test organization',
    },
    {
      id: '3',
      resourceType: 'Organization',
      name: 'test organization',
    },
  ],
  practitioners: [
    {
      id: '1',
      resourceType: 'Practitioner',
    },
    {
      id: '2',
      resourceType: 'Practitioner',
    },
  ],
  conditions: [
    {
      id: '1',
      resourceType: 'Condition',
      subject: {
        reference: 'Patient/1',
      },
    },
    {
      id: '2',
      note: [{ text: 'test note' }],
      resourceType: 'Condition',
      subject: {
        reference: 'Patient/2',
      },
    },
  ],
  encounters: [
    { id: '1', resourceType: 'Encounter' },
    { id: '2', resourceType: 'Encounter' },
    { id: '3', resourceType: 'Encounter' },
    { id: '4', resourceType: 'Encounter' },
    { id: '5', resourceType: 'Encounter' },
  ],
};
