import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicEdit } from './academic-edit';

describe('AcademicEdit', () => {
  let component: AcademicEdit;
  let fixture: ComponentFixture<AcademicEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
