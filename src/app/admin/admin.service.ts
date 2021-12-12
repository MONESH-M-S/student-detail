import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.BACKEND_URL;
  isAdmin: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {}

  adminLogin(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getStudents() {
    return this.http.get<{ user: any[] }>(`${this.BACKEND_URL}admin/home`);
  }

  getStudentDetail(id: string) {
    return this.http.get<{ user: any }>(`${this.BACKEND_URL}admin/home/${id}`);
  }

  getStudentActivityDetail(id: string) {
    return this.http.get<{ message: string; activites: any[] }>(
      `${this.BACKEND_URL}admin/home/user/${id}`
    );
  }

  getStudentActivityTable(id: string) {
    return this.getStudentActivityDetail(id);
  }
}
