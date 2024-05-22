import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as XLSX from 'xlsx';
import { Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  reg_data: any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  
  constructor(
    private http: HttpClient,
    private _Platform: Platform
  ) {}

  async ngOnInit() {
    this.http.get('https://turningbrain.co.in/api/registrationListApi').subscribe(
      (res: any) => {
        console.log("res hai ", res);
        this.reg_data = res;
      }
    );

    const granted = await LocalNotifications.requestPermissions();
    if (granted.display !== 'granted') {
      console.warn('Notifications permission not granted');
    }
  }

  // Generate Excel file
  excel() {
    alert("Generating Excel...");
    let serialNo = 1;
    const data = this.reg_data.map((reg: any) => ({
      'Serial No.': serialNo++,
      'Name': reg.name,
      'Mobile': reg.Mobile,
      'Email': reg.Email,
      'Gender': reg.Gender,
      'Jati Name': reg.Jati_name,
      'Category Name': reg.category_name,
      'Party Name': reg.Party_name,
      'Car No': reg.car_no,
      'Weapon No': reg.Weapon_no,
      'City': reg.City,
      'Block': reg.Block,
      'Janpath Name': reg.Janpath_name,
      'Vidhansabha Name': reg.Vidhansabha_name,
      'Loksabha Name': reg.Loksabha_name,
      'Address': reg.Address,
      'Description': reg.Description,
    }));
    try {
      this.downloadExcel(data);
      alert("Excel downloaded successfully");
    } catch {
      alert("Excel download failed");
    }
  }

  // Download Excel
  async downloadExcel(data: any) {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      // Apply custom styling to the sheet
      ws['!cols'] = [{ width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }];
      ws['!rows'] = [{ hpt: 20 }, { hpt: 20 }, { hpt: 20 }];
      ws['A1'].s = { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: 'FFFF00' } } };

      // Generate unique filename with timestamp without year
      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `Registration_${timestamp}.xlsx`;

      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

        const excelData: Blob = new Blob([excelBuffer], {
          type: this.EXCEL_TYPE
        });

        await write_blob({
          path: filename,
          directory: Directory.Documents,
          blob: excelData
        });

        this.showNotification('Excel Downloaded', 'Your Excel file has been saved successfully.');
      } else {
        // For other platforms or web environment
        XLSX.writeFile(wb, filename);
        this.showNotification('Excel Downloaded', 'Your Excel file has been saved successfully.');
      }
    } catch (error) {
      alert("Data not found");
    }
  }

  async showNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) }, // Schedule to show after 1 second
          sound: 'default', // Provide a default sound or remove this property if not needed
          attachments: [], // Provide an empty array as a default value or remove this property if not needed
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }
  
  
}