import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeOfCareComponent } from './episode-of-care.component';

describe('EpisodeOfCareComponent', () => {
  let component: EpisodeOfCareComponent;
  let fixture: ComponentFixture<EpisodeOfCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeOfCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeOfCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
