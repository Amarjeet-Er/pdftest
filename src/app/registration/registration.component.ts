import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { LocalNotifications } from '@capacitor/local-notifications';

import * as pdfMake from 'pdfmake/build/pdfmake';
const pdfMakeX = require('pdfmake/build/pdfmake');
const pdfFontsX = require('pdfmake/build/vfs_fonts');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  reg_data: any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

  documentDefinition: any
  constructor(
    private http: HttpClient,
    private _Platform: Platform
  ) { }

  async ngOnInit() {
    this.http.get('https://turningbrain.co.in/api/registrationListApi').subscribe(
      (res: any) => {
        // alert("res hai "+JSON.stringify(res));
        this.reg_data = res;
      }
    );

    const granted = await LocalNotifications.requestPermissions();
    if (granted.display !== 'granted') {
      alert('Notifications permission not granted');
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
          schedule: { at: new Date(Date.now() + 1000) },
          sound: 'default',
          attachments: [],
          extra: null
        }
      ]
    });


  }




  // for pdf generate code 

  async PDF() {
    alert("Generating PDF...");
    try {
      this.documentDefinition = this.generateDocumentDefinition();

      // Generate unique filename with timestamp without year
      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `Registration_${timestamp}.pdf`;

      // Save PDF based on platform
      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        const pdfBuffer = pdfMake.createPdf(this.documentDefinition).getBuffer(async (buffer: ArrayBuffer) => {
          await write_blob({
            path: filename,
            directory: Directory.Documents,
            blob: new Blob([buffer])
          });
        });
      } else {
        pdfMake.createPdf(this.documentDefinition).download(filename);
      }

      this.showPDFNotification('PDF Downloaded', 'Your PDF file has been saved successfully.');
    } catch (error) {
      alert("Error generating PDF");
    }
  }

  generateDocumentDefinition() {
    const content = [];
    content.push({ text: 'Registration Data', style: 'header' });
    content.push('\n');

    // Define table headers
    const tableHeaders = [
      { text: 'Serial No.', style: 'tableHeader' },
      { text: 'Name', style: 'tableHeader' },
      { text: 'Mobile', style: 'tableHeader' },
      { text: 'Email', style: 'tableHeader' },
      { text: 'Gender', style: 'tableHeader' },
      { text: 'Jati Name', style: 'tableHeader' },
      { text: 'Category Name', style: 'tableHeader' },
      { text: 'Party Name', style: 'tableHeader' },
      { text: 'Car No', style: 'tableHeader' },
      { text: 'Weapon No', style: 'tableHeader' },
      { text: 'City', style: 'tableHeader' },
      { text: 'Block', style: 'tableHeader' },
      { text: 'Janpath Name', style: 'tableHeader' },
      { text: 'Vidhansabha Name', style: 'tableHeader' },
      { text: 'Loksabha Name', style: 'tableHeader' },
      { text: 'Address', style: 'tableHeader' },
      { text: 'Description', style: 'tableHeader' }
    ];

    // Create table body
    const tableBody = this.reg_data.map((reg: any, index: number) => [
      { text: (index + 1).toString(), style: 'tableBody' },
      { text: reg.name, style: 'tableBody' },
      { text: reg.Mobile, style: 'tableBody' },
      { text: reg.Email, style: 'tableBody' },
      { text: reg.Gender, style: 'tableBody' },
      { text: reg.Jati_name, style: 'tableBody' },
      { text: reg.category_name, style: 'tableBody' },
      { text: reg.Party_name, style: 'tableBody' },
      { text: reg.car_no, style: 'tableBody' },
      { text: reg.Weapon_no, style: 'tableBody' },
      { text: reg.City, style: 'tableBody' },
      { text: reg.Block, style: 'tableBody' },
      { text: reg.Janpath_name, style: 'tableBody' },
      { text: reg.Vidhansabha_name, style: 'tableBody' },
      { text: reg.Loksabha_name, style: 'tableBody' },
      { text: reg.Address, style: 'tableBody' },
      { text: reg.Description, style: 'tableBody' }
    ]);

    // Construct table
    const table = {
      headerRows: 1,
      widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      body: [
        tableHeaders,
        ...tableBody
      ],

    };

    // Add table to content
    content.push({
      table: table,
      layout: 'lightHorizontalLines'
    });

    return {
      content: content,
      styles: {
        header: {
          fontSize: 10,
          bold: true
        },
        tableHeader: {
          bold: true,
          fontSize: 5,
          color: 'black'
        },
        tableBody: {
          fontSize: 5
        }
        
      },
      pageSize: 'A4', // Set the page size to A4
      pageOrientation: 'landscape', // Set the page orientation to landscape
      pageMargins: [10, 10, 10, 15],
    };
  }


  async showPDFNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: 'default',
          attachments: [],
          extra: null
        }
      ]
    });
  }



}
