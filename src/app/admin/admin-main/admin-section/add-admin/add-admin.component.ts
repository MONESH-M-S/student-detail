import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin/admin.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  editMode: boolean;
  editId: string;
  editAdmin: any;
  isLoading = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private location: Location,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (params) {
        if (params.params.add) {
          this.editMode = false;
        } else if (params.params.edit) {
          this.editMode = true;
          this.editId = params.params.edit;
        }
      }
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.value) {
      return;
    }
    const mentor = {
      email: form.value.email,
      name: form.value.name,
      password: form.value.password,
      isAdmin: this.isAdmin,
    };
    this.adminService.addNewAdmin(mentor).subscribe((data) => {
      if ((data.mentor === 'Admin added')) {
        this.snackbar.open('Admin Added Successfully!', '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        form.reset();
      } else {
        this.snackbar.open('Adding Admin Failed!', '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        window.setTimeout(() => {
          form.reset();
        }, 5000);
      }
    });
    this.isLoading = false;
  }
}
