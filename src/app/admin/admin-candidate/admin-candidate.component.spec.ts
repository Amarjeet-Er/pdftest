import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidateComponent } from './admin-candidate.component';

describe('AdminCandidateComponent', () => {
  let component: AdminCandidateComponent;
  let fixture: ComponentFixture<AdminCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCandidateComponent]
    });
    fixture = TestBed.createComponent(AdminCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
