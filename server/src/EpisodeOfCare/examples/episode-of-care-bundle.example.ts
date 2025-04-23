export const episodeOFCareBundleExample = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  entry: [
    {
      fullUrl:
        'http://localhost:8080/api/v2/r5/EpisodeOfCare/02e527f7-0448-4f8e-8615-6f2c360cb2c4',
      resource: {
        id: '02e527f7-0448-4f8e-8615-6f2c360cb2c4',
        resourceType: 'EpisodeOfCare',
        status: 'waitlist',
        patient: {
          reference: 'Patient/b177ec2c-705a-4ad2-8639-1f241d999e1d',
        },
        diagnosis: [
          {
            condition: [
              {
                reference: {
                  reference: 'Condition/7258ca06-f491-4ae7-9628-a6b76a77c24f',
                },
              },
            ],
          },
        ],
        type: [
          {
            coding: [
              {
                code: 'pac',
                system:
                  'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
                display: 'Post Acute Care',
              },
            ],
          },
        ],
      },
    },
  ],
};
