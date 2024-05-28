import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  base_url: string = ''
  constructor(
    private _shared: SharedService,
    private _http: HttpClient
  ) {
    this._shared.base_url.subscribe(
      (res: any) => {
        console.log(res);
        this.base_url = res;
      }
    )
  }
  // for login 
  login(data: any) {
    return this._http.post(`${this.base_url}LoginApi`, data);
  }

  get_select_designation() {
    return this._http.get(`${this.base_url}DesignationApi`);
  }
  get_select_department() {
    return this._http.get(`${this.base_url}DepartmentApi`);
  }
  get_select_sub_dept(depat_id: string) {
    return this._http.get<[]>(`${this.base_url}SubDepartments?Department=${depat_id}`)
  }
  get_select_state() {
    return this._http.get(`${this.base_url}StateApi`);
  }
  get_select_city(state_id: string) {
    return this._http.get<[]>(`${this.base_url}CityApi?State=${state_id}`)
  }

  //for registration
  post_reg_form(id:string, data: any) {
    return this._http.post(`${this.base_url}registrationListApi?user_id=${id}`, data)
  }
  get_registration_list() {
    return this._http.get(`${this.base_url}RegistrationReportApi`);
  }
  put_reg_form(id:string,data: any) {
    return this._http.post(`${this.base_url}registrationListApi?user_id=${id}`, data)
  }

  reg_delete(id: string) {
    return this._http.post(`${this.base_url}DeleteRegistrationApi?id=${id}`, null);
  }

  //for emp reg

  post_reg_emp_form(data: any) {
    return this._http.post(`${this.base_url}EmployeeApi`, data)
  }
  get_emp_registration_list() {
    return this._http.get(`${this.base_url}EmployeeApi`);
  }
  put_emp_reg_form(data: any) {
    return this._http.post(`${this.base_url}EmployeeApi`, data)
  }
  emp_reg_delete(id: string) {
    return this._http.post(`${this.base_url}DeleteEmployeeApi?id=${id}`, null);
  }
  emp_reg_list(id: string) {
    return this._http.get(`${this.base_url}registrationListApi?user_id=${id}`);
  }
  emp_profile(id: string) {
    return this._http.get(`${this.base_url}profileEmployeeApi?id=${id}`);
  }
}
