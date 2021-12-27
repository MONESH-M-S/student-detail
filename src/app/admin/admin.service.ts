import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.BACKEND_URL;
  isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  adminLogin(email: string, password: string): Observable<{ mentor: any }> {
    const detail = { email: email, password: password };
    return this.http.post<{
      mentor: any;
    }>(`${this.BACKEND_URL}mentor/login`, detail);
  }

  getStudents(mentor: string) {
    return this.http.post<{ user: any[] }>(
      `${this.BACKEND_URL}admin/home`,
      mentor
    );
  }

  getStudentDetail(id: string) {
    return this.http.get<{ user: any }>(
      `${this.BACKEND_URL}admin/home/detail/${id}`
    );
  }

  getStudentActivityDetail(id: string) {
    return this.http.get<{ message: string; activites: any[] }>(
      `${this.BACKEND_URL}admin/home/user/${id}`
    );
  }

  getStudentActivityTable(id: string) {
    return this.getStudentActivityDetail(id);
  }

  // Marks-splitup
  getStudentMarkTable(id: string) {
    return this.http.get<{ mark: any }>(`${this.BACKEND_URL}mark/${id}`);
  }

  getAllStudentMarks() {
    return this.http.get<{ data: any }>(`${this.BACKEND_URL}marks`);
  }

  // Get user-single activity
  getUserActivity(id: string, aid: string) {
    return this.http.get<{ activity: any }>(
      `${this.BACKEND_URL}user/${id}/activity/${aid}`
    );
  }
}
