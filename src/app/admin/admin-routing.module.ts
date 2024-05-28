import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCandidateComponent } from './admin-candidate/admin-candidate.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateReportsComponent } from './candidate-reports/candidate-reports.component';
import { FilterDesignationComponent } from './filter-designation/filter-designation.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'candidate', component: AdminCandidateComponent },
      { path: 'employee', component: AdminEmployeeComponent },
      { path: 'registrationform', component: CandidateRegistrationComponent },
      { path: 'registrationlist', component: CandidateListComponent },
      { path: 'reportslist', component: CandidateReportsComponent },
      { path: 'filterdesignation', component: FilterDesignationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
