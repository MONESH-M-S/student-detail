import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BACKEND_URL = environment.BACKEND_URL;
  firbaseSignup = false;
  errorMsg = '';
  userId: any;

  constructor( private http: HttpClient) {}

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
      `${this.BACKEND_URL}student-signup`,
      userData
    );
  }

  userLogin(email: string, password: string) {
    const authData = { email: email, password: password };
    return this.http.post<{ message: string; user: any; id: string }>(
      `${this.BACKEND_URL}`,
      authData
    );
  }

  postUserData(form: FormData) {
    return this.http.post<{ message: string; data: any }>(
      `${this.BACKEND_URL}user/activity`,
      form
    );
  }

  getUserActivity(id: string) {
    return this.http.get<{ message: string; activity: any[] }>(
      `${this.BACKEND_URL}user/getall-activity/${id}`
    );
  }

  deleteActivity(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.BACKEND_URL}user/delete/${id}`
    );
  }
}
