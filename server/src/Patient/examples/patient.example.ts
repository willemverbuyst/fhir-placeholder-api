export const patientExample = {
  id: 'e60648d3-22e8-4c0f-93aa-ce6023bb678a',
  name: [
    {
      family: 'Cruickshank',
      given: ['Suzanne'],
    },
  ],
  resourceType: 'Patient',
  birthDate: '2014-12-12',
  gender: 'female',
  telecom: [
    {
      use: 'old',
      system: 'email',
      value: 'Suzanne.Cruickshank36@fhir-placeholder.api',
    },
    {
      use: 'mobile',
      system: 'phone',
      value: '(526) 739-8740',
    },
  ],
  address: [
    {
      use: 'home',
      type: 'both',
      line: ['975 Delfina Pines'],
      city: 'Hammesstead',
      state: 'South Dakota',
      postalCode: '34262',
      country: 'Guadeloupe',
    },
  ],
  managingOrganization: {
    reference: 'Organization/32c51632-86f4-488a-8ab2-b81bd06b6a29',
  },
  generalPractitioner: [
    {
      reference: 'Practitioner/f1d753b3-93fa-4a45-b9bd-beacf6558b7c',
    },
  ],
  communication: [
    {
      language: {
        coding: [
          {
            code: 'sk-SK',
            system: 'urn:ietf:bcp:47',
            display: 'Slovakian (Slovakia)',
          },
        ],
      },
      preferred: true,
    },
  ],
};
