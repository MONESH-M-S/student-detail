import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  errorMsg: string = '';
  isAuth: boolean = false;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isAuth = true;
    this.adminService
      .adminLogin(form.value.email, form.value.password)
      .subscribe(
        (mentor) => {
          if (mentor.mentor.length < 1) {
            this._error();
            this.errorMsg = 'Invalid Email or Password';
          } else {
            this.adminService.isAdmin = true;
            this.errorMsg = '';
            this.snackbar.open('Admin verified!', '', {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['mat-toolbar', 'mat-accent'],
            });
            this.isAuth = false;
            this.router.navigate([`/admin/home/${mentor.mentor[0].name}`]);
          }
        },
        (err) => {
          this._error();
          this.errorMsg = err.message;
        }
      );
    window.setTimeout(() => {
      this.errorMsg = '';
    }, 6000);
    form.resetForm();
  }

  private _error() {
    this.adminService.isAdmin = false;
    this.isAuth = false;
    this.snackbar.open('Admin verification Failed!', '', {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
