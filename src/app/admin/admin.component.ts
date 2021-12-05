import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  errorMsg: string = '';
  isAuth: boolean = false;
  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isAuth = true;
    this.fireAuth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((res) => {
        this.errorMsg = '';
        this.isAuth = false;
        this.router.navigate(['/admin/home']);
      })
      .catch((err) => {
        this.isAuth = false;
        this.errorMsg = err.message;
        console.log(err);
      });
    form.resetForm();
  }
}
