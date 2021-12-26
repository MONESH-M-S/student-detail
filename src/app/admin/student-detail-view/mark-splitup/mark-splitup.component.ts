import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as FileSaver from 'file-saver';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mark-splitup',
  templateUrl: './mark-splitup.component.html',
  styleUrls: ['./mark-splitup.component.scss'],
})
export class MarkSplitupComponent implements OnInit {
  details: any[] = [];
  id: string;
  total: number = 0;
  constructor(
    private location: Location,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService.getStudentMarkTable(this.id).subscribe((data) => {
      Object.keys(data.mark[0]).forEach((key) => {
        if (
          key == '_id' ||
          key == 'creator' ||
          key == '__v' ||
          key == 'obtained' ||
          key == 'name' ||
          key == 'roll'
        ) {
        } else {
          this.details.push({
            event: key,
            mark: data.mark[0][key],
          });
        }
      });
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
    FileSaver.saveAs(data, fileName + '_' + this.id + EXCEL_EXTENSION);
  }
}
