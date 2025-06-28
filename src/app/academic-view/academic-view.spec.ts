import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicView } from './academic-view';

describe('AcademicView', () => {
  let component: AcademicView;
  let fixture: ComponentFixture<AcademicView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
