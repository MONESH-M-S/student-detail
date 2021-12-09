import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firbaseSignup = false;
  errorMsg = '';

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {}

  onSignup(
    name: string,
    email: string,
    roll: string,
    password: string,
    mentor: string,
    image: string
  ): Observable<{ user: any }> {
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('roll', roll);
    userData.append('password', password);
    userData.append('mentor', mentor);
    userData.append('image', image, name);

    return this.http.post<{ user: any }>(
      `http://localhost:3000/student-signup`,
      userData
    );
  }

  signupOnFirebase(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.firbaseSignup = true;
      })
      .catch((err) => {
        this.errorMsg = err;
      });
  }
}
