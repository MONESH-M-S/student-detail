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
  userId: any;

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

  userLogin(email: string, password: string) {
    const authData = { email: email, password: password };
    return this.http.post<{ message: string; user: any; id: string }>(
      'http://localhost:3000/',
      authData
    );
  }

  postUserData(form: FormData) {
    return this.http.post<{ message: string; data: any }>(
      `http://localhost:3000/user/activity`,
      form
    );
  }

  getUserActivity(id: string) {
    return this.http.get<{ message: string; activity: any[] }>(
      `http://localhost:3000/user/getall-activity/${id}`
    );
  }

  deleteActivity(id: string) {
    return this.http.delete<{ message: string }>(
      `http://localhost:3000/user/delete/${id}`
    );
  }
}
