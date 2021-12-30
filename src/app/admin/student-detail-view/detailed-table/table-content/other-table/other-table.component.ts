import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/student/auth.service';
import { DialogComponent } from 'src/app/student/history/dialog/dialog.component';
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component';

@Component({
  selector: 'app-other-table',
  templateUrl: './other-table.component.html',
  styleUrls: ['./other-table.component.scss']
})
export class OtherTableComponent implements OnInit {
  activityDetails = [];
  id: string;
  errMsg: string;
  paperActivityDetails: any[];
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService
      .getStudentActivityDetailByIndex(this.id, 'other-ncc')
      .subscribe(
        (res) => {
          this.activityDetails = res.activity;
        },
        (err) => {
          console.log(err);
          this.errMsg = err;
        }
      );
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
            if (res) {
              this.adminService
                .getStudentActivityTable(this.id)
                .subscribe((data) => {
                  this.paperActivityDetails = data.activites;
                });
            }
          });
        }
      });
    }
  }
}