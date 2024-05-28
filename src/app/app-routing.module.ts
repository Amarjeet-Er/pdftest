import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin.module').then((a) => a.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('../app/employee/employee.module').then((a) => a.EmployeeModule)
  },
  // { path: 'forgotpassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
