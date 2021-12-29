import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoading: boolean = false;

  tableDataLeft = [
    {
      name: 'Paper/Project Table',
      tooltip: 'Show Paper / Project Presentated Table',
      params: 'paper'
    },
    {
      name: 'Gate/VAC Table',
      tooltip: 'Show Gate / VAC Detailed Table',
      params: 'gate'
    },
    {
      name: 'Club Activites',
      tooltip: 'Show Club Activity Table',
      params: 'club'
    },
  ];
  tableDataRight = [
    {
      name: 'Intership/Placement',
      tooltip: 'Show Internship / Placement Detail Table',
      params: 'intern'
    },
    {
      name: 'Sports Activites',
      tooltip: 'Show Sports Activity Table',
      params: 'sports'
    },
    {
      name: 'NCC/Other Activites',
      tooltip: 'Show NCC / Other Activity Table',
      params: 'other'
    },
  ];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
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
      if (this.deletedActivityDetails.activity == 'paper/project') {
        if (this.deletedActivityDetails.activity.type == 'paper') {
          this.activityDetails.paper =
            this.activityDetails.paper -
            this.deletedActivityDetails.activity.mark;
        } else if (this.deletedActivityDetails.activity.type == 'project') {
          this.activityDetails.project =
            this.activityDetails.project -
            this.deletedActivityDetails.activity.mark;
        }
        this.activityDetails.total =
          this.activityDetails.total -
          this.deletedActivityDetails.activity.total;
        console.log(this.activityDetails);
      }
    });
  }

  onClicked(data: string) {
    this.router.navigate([`admin/home/detail-table/${this.id}`], {
      queryParams: { table: data },
    });
  }

  ngOnDestroy() {
    this.activityDetails = [];
  }
}
