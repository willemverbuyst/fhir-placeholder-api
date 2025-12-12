import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRendererComponent } from './resource-renderer.component';

describe('ResourceRendererComponent', () => {
  let component: ResourceRendererComponent;
  let fixture: ComponentFixture<ResourceRendererComponent>;

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
