import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'', component:EntryFormComponent
  },
  {
    path:'entryform', component:EntryFormComponent
  },
  {
    path:'registration', component:RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
