import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicAdd } from './academic-add';

describe('AcademicAdd', () => {
  let component: AcademicAdd;
  let fixture: ComponentFixture<AcademicAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
