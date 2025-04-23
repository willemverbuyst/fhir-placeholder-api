export const encounterBundleExample = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  entry: [
    {
      fullUrl:
        'http://localhost:8080/api/v2/r5/Encounter/d58e8219-08f5-47e3-8428-671c5ede2c67',
      resource: {
        id: 'd58e8219-08f5-47e3-8428-671c5ede2c67',
        resourceType: 'Encounter',
        status: 'discontinued',
        subject: {
          reference: 'Patient/7a8e922a-95d2-4fab-82f2-b368dba21a50',
        },
        episodeOfCare: [
          {
            reference: 'EpisodeOfCare/922babe0-71eb-4e9e-9ee5-c9f83aea7d09',
          },
        ],
      },
    },
  ],
};
