import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { ConfirmBoxDeleteComponent } from 'src/app/confirm-box-delete/confirm-box-delete.component';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  headerBox: boolean = true;
  siteSearch: boolean = false
  panelOpenState = false;
  reg_data: any;
  base_url: any
  reg_filter_data: any;
  deletevalue: any;
  UserId: any;
  user_id: any;

  constructor(
    private _dialog: MatDialog,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    console.log(this.user_id, 'user id');
  }
  ngOnInit(): void {
    this._shared.base_img_url.subscribe(
      (res: any) => {
        this.base_url = res
      }
    )
    this._crud.emp_reg_list(this.user_id).subscribe(
      (res: any) => {
        console.log(res);
        this.reg_data = res
        this.reg_filter_data = res
      }
    )
  }
  onHeaderBox() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onSiteSearch() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;

    this._crud.emp_reg_list(this.user_id).subscribe(
      (res: any) => {
        console.log(res);
        this.reg_data = res
      }
    )
  }
  onRegEdit(data: any) {
    console.log(data);
    this._shared.shared_details.next(data)
    this._router.navigate(['/admin/registrationupdate'])
  }

  onDelete(data: any): void {
    console.log(data);
    // const dialogRef = this._dialog.open(ConfirmBoxDeleteComponent, {
    //   height: '110px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (this.deletevalue == result) {
    //     const deldata = new FormData();
    //     deldata.append('Id', data.Id);
    //     console.log(deldata);
    //     this._crud.reg_delete(data.Id).subscribe(
    //       (res: any) => {
    //         console.log(res)
    //         this._crud.emp_reg_list(this.user_id).subscribe(
    //           (res: any) => {
    //             console.log(res);
    //             this.reg_data = res
    //           }
    //         )
    //         this._shared.tostSuccessTop('Delete Successfully...')
    //       },
    //       (error: any) => {
    //         console.log(error);
    //         this._shared.tostErrorTop('Not delete')
    //       }
    //     )
    //   }
    //   else { }
    // });
  }


  onListSearch(filter: string) {
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data.fullname.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }

      if (data.Mobile.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }

      if (data.Alternatemobile.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }

      if (data.Email.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.Designation_name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.Department_name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.SubDept_name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.Statename.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.City_name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.AadharNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      if (data.PanNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      if (data.dob.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      if (data.Experience.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return true;
      }
      else {

      }
      return false;
    }
    );
  }
}
