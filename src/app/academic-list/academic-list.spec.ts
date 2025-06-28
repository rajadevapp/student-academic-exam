import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicList } from './academic-list';

describe('AcademicList', () => {
  let component: AcademicList;
  let fixture: ComponentFixture<AcademicList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
