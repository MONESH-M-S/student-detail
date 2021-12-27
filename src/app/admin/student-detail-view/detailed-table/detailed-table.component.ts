import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.scss'],
})
export class DetailedTableComponent implements OnInit, OnDestroy {
  activityDetails: any[];
  id: string;
  isLoading: boolean = false;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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

  onEditActivity(activityId: string) {
    if (activityId) {
      this.router.navigate([`admin/home/detail/${this.id}/edit/${activityId}`]);
    }
  }

  ngOnDestroy() {
    this.activityDetails = [];
  }
}
