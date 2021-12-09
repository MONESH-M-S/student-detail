import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firbaseSignup = false;
  errorMsg = '';

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {}

  onSignup(form: FormData) {
    // this.fireAuth
    //   .createUserWithEmailAndPassword(form.value.email, form.value.roll)
    //   .then((res) => {
    //     this.firbaseSignup = true;
    //   })
    //   .catch((err) => {
    //     this.errorMsg = err;
    //   });

    return this.http.post('https://localhost:3000/student-signup', form);
  }
}
