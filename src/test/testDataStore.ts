import { Injectable } from '@nestjs/common';

@Injectable()
export class TestDataStore {
  patients: [
    {
      id: '1';
      resourceType: 'Patient';
      managingOrganization: {
        reference: 'Organization/1';
      };
      generalPractitioner: [
        {
          reference: 'Practitioner/1';
        },
      ];
    },
    {
      id: '2';
      resourceType: 'Patient';
    },
  ];
  episodes: [
    {
      id: '1';
      resourceType: 'EpisodeOfCare';
      status: 'active';
      patient: { reference: 'Patient/1' };
    },
    {
      id: '2';
      resourceType: 'EpisodeOfCare';
      status: 'active';
      patient: { reference: 'Patient/2' };
    },
  ];
  organizations: [
    {
      id: '1';
      resourceType: 'Organization';
      name: 'test organization';
    },
    {
      id: '2';
      resourceType: 'Organization';
      name: 'another test organization';
    },
  ];
  practitioners: [
    {
      id: '1';
      resourceType: 'Practitioner';
    },
    {
      id: '2';
      resourceType: 'Practitioner';
    },
  ];
  conditions: [
    {
      id: '1';
      resourceType: 'Condition';
      subject: {
        reference: 'Patient/1';
      };
    },
    {
      id: '2';
      note: [{ text: 'test note' }];
      resourceType: 'Condition';
      subject: {
        reference: 'Patient/2';
      };
    },
  ];
}
