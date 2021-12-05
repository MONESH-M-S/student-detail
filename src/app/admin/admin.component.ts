import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private fireAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isAuth = true;
    this.fireAuth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((res) => {
        this.errorMsg = '';
        this.snackbar.open('Admin verified!', 'Done', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.isAuth = false;
        this.router.navigate(['/admin/home']);
      })
      .catch((err) => {
        this.isAuth = false;
        this.snackbar.open('Admin verification Failed!', 'Done', {
          duration: 6000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
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
