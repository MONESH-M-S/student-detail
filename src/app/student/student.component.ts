import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isAuth = true;
    this.fireAuth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((res) => {
        this.errorMsg = '';
        this.snackbar.open('Login Successful!', '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        this.isAuth = false;
        this.router.navigate(['student/detail-upload']);
      })
      .catch((err) => {
        this.isAuth = false;
        this.snackbar.open('Student Login Failed!', '', {
          duration: 6000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent'],
        });
        this.errorMsg = err.message;
        console.log(err);
      });
    window.setTimeout(() => {
      this.errorMsg = '';
    }, 6000);
    form.resetForm();
  }
}
