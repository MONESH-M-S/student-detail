import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-mark-splitup',
  templateUrl: './mark-splitup.component.html',
  styleUrls: ['./mark-splitup.component.scss'],
})
export class MarkSplitupComponent implements OnInit {
  details: any[] = [
    { event: 'sample1', maxiMark: 55, mark: 6 },
    { event: 'sample2', maxiMark: 35, mark: 32 },
    { event: 'sample3', maxiMark: 56, mark: 33 },
    { event: 'sample3', maxiMark: 56, mark: 33 },
  ];
  constructor(private location: Location) {}

  ngOnInit(): void {}

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
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
