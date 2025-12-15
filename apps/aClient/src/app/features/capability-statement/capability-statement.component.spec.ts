import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityStatementComponent } from './capability-statement.component';

describe('CapabilityStatementComponent', () => {
  let component: CapabilityStatementComponent;
  let fixture: ComponentFixture<CapabilityStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapabilityStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapabilityStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
