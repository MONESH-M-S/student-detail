import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss'],
})
export class AdminSectionComponent implements OnInit {
  mentors = [];
  isLoading = false;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getAllAdminDetail().subscribe((result) => {
      this.mentors = result.mentors;
      this.isLoading = false;
    });
  }

  addOrEditAdmin() {
    this.router.navigate(['admin/add'], { queryParams: { add: true } });
  }

  goBack() {
    this.location.back();
  }

  deleteAdmin(id: string) {
    if (id) {
      let dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result === 'yes') {
            this.adminService.deleteAdminById(id).subscribe((res) => {
              if (res) {
                this.snackbar.open('Admin Deleted Successfully!', '', {
                  duration: 4000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: ['mat-toolbar', 'mat-accent'],
                });
                this.adminService.getAllAdminDetail().subscribe((result) => {
                  this.mentors = result.mentors;
                });
              }
            });
          }
        },
        (err) => {
          this.snackbar.open('Admin Deleting Failed!', '', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        }
      );
    }
  }
}
