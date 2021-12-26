import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from '../../admin.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-marks-table',
  templateUrl: './marks-table.component.html',
  styleUrls: ['./marks-table.component.scss'],
})
export class MarksTableComponent implements OnInit {
  details: any;
  isLoading = false;
  constructor(private location: Location, private adminService: AdminService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getAllStudentMarks().subscribe((data) => {
      this.details = data.data;
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.details);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'detail');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_' + 'eie' + EXCEL_EXTENSION);
  }
}
