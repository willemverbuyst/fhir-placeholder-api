import { createOrganization } from './organization';

describe('createOrganization', () => {
  it('should create an organization with a valid structure', () => {
    const organization = createOrganization();

    expect(organization).toHaveProperty('id');
    expect(organization).toHaveProperty('resourceType', 'Organization');
    expect(organization).toHaveProperty('name');
    expect(organization).toHaveProperty('active', true);
  });
});
