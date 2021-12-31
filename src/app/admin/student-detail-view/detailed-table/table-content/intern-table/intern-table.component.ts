import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/student/auth.service';
import { DialogComponent } from 'src/app/student/history/dialog/dialog.component';
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {
  activityDetails = [];
  id: string;
  errMsg: string;
  paperActivityDetails: any[];
  isLoading: boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService
      .getStudentActivityDetailByIndex(this.id, 'internship-placement')
      .subscribe(
        (res) => {
          this.activityDetails = res.activity;
          this.isLoading = false
        },
        (err) => {
          console.log(err);
          this.errMsg = err;
          console.log(err)
          this.isLoading = false;
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
                .getStudentActivityDetailByIndex(this.id, 'internship-placement')
                .subscribe((data) => {
                  this.activityDetails = data.activity;
                });
            }
          });
        }
      });
    }
  }
}
