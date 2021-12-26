import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.scss'],
})
export class DetailedTableComponent implements OnInit, OnDestroy {
  activityDetails: any[];
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.adminService
          .getStudentActivityTable(params['id'])
          .subscribe((data) => {
            this.activityDetails = data.activites;
            console.log(this.activityDetails);
          });
      }
    });
  }

  openDialog(image: string) {
    this.dialog.open(ImageDialogComponent, {
      width: '550px',
      data: {
        image: image,
      },
    });
  }

  ngOnDestroy() {
    this.activityDetails = [];
  }
}
