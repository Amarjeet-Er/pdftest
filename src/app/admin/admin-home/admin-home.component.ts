import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService,
  ) { }

  ngOnInit(): void { }

  onDashboard(): boolean {
    return this._router.isActive('/admin/dashboard', true);
  }

  onCandidate(): boolean {
    return this._router.isActive('/admin/candidate', true);
  }
  onEmployee(): boolean {
    return this._router.isActive('/admin/employee', true);
  }
  onEmpRegistrationForm(): boolean {
    return this._router.isActive('/admin/empregistrationform', true);
  }
  onEmpRegistrationList(): boolean {
    return this._router.isActive('/admin/empregistrationlist', true);
  }
  onEmpRegistrationUpdate(): boolean {
    return this._router.isActive('/admin/empregistrationupdate', true);
  }

  onRegistrationForm(): boolean {
    return this._router.isActive('/admin/registrationform', true);
  }

  onRegistrationUpdate(): boolean {
    return this._router.isActive('/admin/registrationupdate', true);
  }

  onRegistrationList(): boolean {
    return this._router.isActive('/admin/registrationlist', true);
  }

  onReports(): boolean {
    return this._router.isActive('/admin/reportslist', true);
  }
  onProfile(): boolean {
    return this._router.isActive('/admin/profile', true);
  }
  onDesignation(): boolean {
    return this._router.isActive('/admin/filterdesignation', true);
  }
  onDepartment(): boolean {
    return this._router.isActive('/admin/filterdepartment', true);
  }
  onState(): boolean {
    return this._router.isActive('/admin/filterstate', true);
  }
  onCity(): boolean {
    return this._router.isActive('/admin/filtercity', true);
  }
  onAllCandidate(): boolean {
    return this._router.isActive('/admin/allcandidate', true);
  }
}