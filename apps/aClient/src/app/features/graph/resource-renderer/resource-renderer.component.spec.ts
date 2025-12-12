import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resource } from 'fhir/r5';
import { ResourceRendererComponent } from './resource-renderer.component';

describe('ResourceRendererComponent', () => {
  let component: ResourceRendererComponent<Resource>;
  let fixture: ComponentFixture<ResourceRendererComponent<Resource>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
