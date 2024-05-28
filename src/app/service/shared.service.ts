import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(
    private _snacker: MatSnackBar
  ) { }

  base_url = new BehaviorSubject<string>('https://heerafacilityservices.com/api/');
  base_img_url = new BehaviorSubject<string>('https://heerafacilityservices.com/')
  shared_details = new BehaviorSubject<object>({})

  // for messages toast notification
  tostSuccessTop(title: any) {
    this._snacker.open(title, '', {
      duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
      panelClass: ['tostSuccess']
    });
  }

  tostSuccessBottom(title: any) {
    this._snacker.open(title, '', {
      duration: 1000, verticalPosition: 'bottom', horizontalPosition: 'end',
      panelClass: ['tostSuccess']
    });
  }

  tostErrorTop(title: any) {
    this._snacker.open(title, '', {
      duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
      panelClass: ['tostError']
    });
  }

  tostErrorBottom(title: any) {
    this._snacker.open(title, '', {
      duration: 1000, verticalPosition: 'bottom', horizontalPosition: 'end',
      panelClass: ['tostError']
    });
  }
  tostWarningTop(title: any) {
    this._snacker.open(title, '', {
      duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
      panelClass: ['tostWarning']
    });
  }
}

