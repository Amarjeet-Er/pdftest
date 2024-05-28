import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCandidateComponent } from './admin-candidate/admin-candidate.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CandidateReportsComponent } from './candidate-reports/candidate-reports.component';
import { FilterDesignationComponent } from './filter-designation/filter-designation.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminCandidateComponent,
    AdminEmployeeComponent,
    CandidateRegistrationComponent,
    CandidateListComponent,
    AdminHomeComponent,
    CandidateReportsComponent,
    FilterDesignationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatStepperModule,
    MatSliderModule,
    MatSlideToggleModule
  ]
})
export class AdminModule { }
