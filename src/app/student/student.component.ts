import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  errorMsg: string = '';
  isAuth: boolean = false;

  constructor(
    private fireAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    this.isAuth = true;
    this.authService.userLogin(form.value.email, form.value.password).subscribe(
      (res) => {
        this.errorMsg = '';
        this.snackbar.open('Login Successful!', '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        this.isAuth = false;
        const id = res.id;
        this.router.navigate([`student/detail-upload/${id}`]);
      },
      (err) => {
        this.isAuth = false;
        this.snackbar.open('Student Login Failed!', '', {
          duration: 6000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        if (err.message === 'Password is wrong') {
          this.errorMsg = 'Invalid email or password';
        } else {
          this.errorMsg = err.message;
        }
      }
    );
    window.setTimeout(() => {
      this.errorMsg = '';
    }, 6000);
    form.resetForm();
  }
}
