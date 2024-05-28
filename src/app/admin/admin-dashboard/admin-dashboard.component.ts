import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  reg_data: any;
  UserId:any
  user_id: any;
  emp_data: any;
  allCnadidate: any;
  constructor(
    private _crud: CrudService,
    private _shared: SharedService
  ) { 
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    console.log(this.user_id, 'user id');
  }

  ngOnInit(): void {
    this._crud.emp_reg_list(this.user_id).subscribe((res: any) => {
      this.reg_data = res;
    })

    this._crud.get_emp_registration_list().subscribe(
      (res: any) => {
        console.log(res);
        this.emp_data = res
        }
    )

    this._crud.get_registration_list().subscribe(
      (res: any) => {
        console.log(res);
        this.allCnadidate = res
      }
    )
  }
}