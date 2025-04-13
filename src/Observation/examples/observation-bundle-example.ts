export const observationBundleExample = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  entry: [
    {
      fullUrl:
        'http://localhost:8080/api/v2/r5/Observation/25355ab2-7b5d-4d32-8531-5f123579c599',
      resource: {
        id: '25355ab2-7b5d-4d32-8531-5f123579c599',
        resourceType: 'Observation',
        status: 'registered',
        code: {
          coding: [
            {
              code: '2345-7',
              system: 'http://loinc.org',
              display: 'Glucose [Mass/volume] in Serum or Plasma --Fasting',
            },
          ],
        },
        encounter: {
          reference: 'Encounter/f0b5caf6-235b-42c3-8820-dbb8b42befa8',
        },
        subject: {
          reference: 'Patient/c81e9d93-8c88-4113-a08a-3efbb7b35bfd',
        },
        note: [
          {
            text: 'Claro adhuc vis cometes verus thorax.',
          },
        ],
      },
    },
  ],
};
