import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDesignationComponent } from './filter-designation.component';

describe('FilterDesignationComponent', () => {
  let component: FilterDesignationComponent;
  let fixture: ComponentFixture<FilterDesignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDesignationComponent]
    });
    fixture = TestBed.createComponent(FilterDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
