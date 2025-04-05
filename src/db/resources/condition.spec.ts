import { createCondition } from './condition';

describe('createCondition', () => {
  it('should create a Condition resource with the correct structure', () => {
    const patientId = 'patient-123';
    const condition = createCondition(patientId);

    expect(condition).toHaveProperty('id');
    expect(condition).toHaveProperty('resourceType', 'Condition');
    expect(condition).toHaveProperty(
      'subject.reference',
      `Patient/${patientId}`,
    );
    expect(condition).toHaveProperty('clinicalStatus.coding');

    if (!condition.clinicalStatus.coding) {
      throw new Error('Condition clinicalStatus coding array is empty');
    }

    expect(condition.clinicalStatus.coding[0]).toHaveProperty('code');
    expect(condition.clinicalStatus.coding[0]).toHaveProperty(
      'system',
      'http://terminology.hl7.org/CodeSystem/condition-clinical',
    );
    expect(condition).toHaveProperty('note');

    if (!condition.note) {
      throw new Error('Condition note array is empty');
    }
    expect(condition.note).toBeInstanceOf(Array);
    expect(condition.note[0]).toHaveProperty('text');
  });

  it('should generate a random clinicalStatus code from the predefined list', () => {
    const patientId = 'patient-123';
    const condition = createCondition(patientId);

    const validCodes = [
      'active',
      'recurrence',
      'relapse',
      'inactive',
      'remission',
      'resolved',
      'unknown',
    ];

    if (!condition.clinicalStatus.coding) {
      throw new Error('Condition clinicalStatus coding array is empty');
    }
    expect(validCodes).toContain(condition.clinicalStatus.coding[0].code);
  });

  it('should associate the condition with the correct patient ID', () => {
    const patientId = 'patient-456';
    const condition = createCondition(patientId);

    expect(condition.subject.reference).toBe(`Patient/${patientId}`);
  });
});
