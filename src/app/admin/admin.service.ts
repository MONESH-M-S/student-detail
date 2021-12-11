import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isAdmin: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {}

  adminLogin(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getStudents() {
    return this.http.get<{ user: any[] }>('http://localhost:3000/admin/home');
  }

  getStudentDetail(id: string) {
    return this.http.get<{ user: any }>(
      `http://localhost:3000/admin/home/${id}`
    );
  }

  getStudentActivityDetail(id: string) {
    return this.http.get<{ message: string; activites: any[] }>(
      `http://localhost:3000/admin/home/user/${id}`
    );
  }

  getStudentActivityTable(id: string) {
    return this.getStudentActivityDetail(id)
  }
}
