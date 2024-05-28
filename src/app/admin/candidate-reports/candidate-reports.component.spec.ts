import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateReportsComponent } from './candidate-reports.component';

describe('CandidateReportsComponent', () => {
  let component: CandidateReportsComponent;
  let fixture: ComponentFixture<CandidateReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateReportsComponent]
    });
    fixture = TestBed.createComponent(CandidateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
