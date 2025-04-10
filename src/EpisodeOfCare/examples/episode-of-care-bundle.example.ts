export const episodeOFCareBundleExample = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  entry: [
    {
      id: 'ad46542b-5fae-40c1-ae22-7425bdbe5e90',
      resourceType: 'EpisodeOfCare',
      status: 'entered-in-error',
      patient: {
        reference: 'Patient/b31e8add-fa60-46ae-95e5-366f49061d31',
      },
      diagnosis: [
        {
          condition: [
            {
              reference: {
                reference: 'Condition/938e063f-ed73-4b4b-8319-c8cb6aee8b62',
              },
            },
          ],
        },
      ],
      type: [
        {
          coding: [
            {
              code: 'diab',
              system:
                'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
              display: 'Post coordinated diabetes program',
            },
          ],
        },
      ],
    },
  ],
};
