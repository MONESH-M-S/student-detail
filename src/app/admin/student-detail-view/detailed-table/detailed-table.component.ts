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
  paperActivityDetails: any;
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
          .getStudentActivityDetailByIndex(params['id'], 'paper-project')
          .subscribe((data) => {
            this.activityDetails = data.activity;
          });
      }
      this.isLoading = false;
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

  onDeleteActivity(activityId: string) {
    if (activityId) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'yes') {
          this.authService.deleteActivity(activityId).subscribe((res) => {
            let mark = 0 - res.activity.mark;
            let id = res.activity.creator;
            if (res.activity?.type === 'paper') {
              this.authService
                .updateUserMark('paper', mark, id)
                .subscribe((res) => {});
            } else if (res.activity?.type === 'project') {
              this.authService
                .updateUserMark('project', mark, id)
                .subscribe((res) => {});
            }
            if (res) {
              this.adminService
                .getStudentActivityDetailByIndex(this.id, 'paper-project')
                .subscribe((data) => {
                  this.activityDetails = data.activity;
                });
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.activityDetails = [];
  }
}
