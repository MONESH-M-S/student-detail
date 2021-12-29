import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/student/auth.service';
import { DialogComponent } from 'src/app/student/history/dialog/dialog.component';
import { AdminService } from '../../admin.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.scss'],
})
export class DetailedTableComponent implements OnInit, OnDestroy {
  activityDetails: any;
  deletedActivityDetails: any;
  id: string;
  queryParams: boolean = false;
  querystring = '';
  isLoading: boolean = false;
  activity: string;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.isLoading = true;
        this.id = params['id'];
        this.adminService
          .getStudentActivityTable(params['id'])
          .subscribe((data) => {
            this.activityDetails = data.activites;
          });
      }
    });
    this.isLoading = false;
  }

  openDialog(image: string) {
    this.dialog.open(ImageDialogComponent, {
      width: '550px',
      data: {
        image: image,
      },
    });
  }

  onDeleteActivity(activityId: string) {
    if (activityId) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'yes') {
          this.getActivityDetail(activityId);
          this.authService.deleteActivity(activityId).subscribe((res) => {
            if (res) {
              this.adminService
                .getStudentActivityTable(this.id)
                .subscribe((data) => {
                  this.activityDetails = data.activites;
                });
            }
          });
        }
      });
    }
  }

  getActivityDetail(aId: string) {
    this.adminService.getUserActivity(this.id, aId).subscribe((result) => {
      this.deletedActivityDetails = result.activity[0];
    });
  }

  onTabClick(event) {
    if (event == 1) {
      this.activity = 'club';
    } else if (event == 2) {
      this.activity = 'gate';
    } else if (event == 3) {
      this.activity = 'internship';
    } else if (event == 4) {
      this.activity = 'sports';
    } else if (event == 5) {
      this.activity = 'other';
    }
    if (this.activity && this.id) {
      this.adminService
        .getStudentActivityDetailByIndex(this.id, this.activity)
        .subscribe((data) => {
          this.activityDetails = data;
        });
    }
  }

  ngOnDestroy() {
    this.activityDetails = [];
    this.queryParams = false;
  }
}
