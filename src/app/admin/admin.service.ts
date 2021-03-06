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

  // get admin-detail by name
  getAdminDetailsByName(mentor: string) {
    return this.http.post<{ mentor: any }>(
      `${this.BACKEND_URL}admin/detail/name`,
      mentor
    );
  }

  // get all-admin
  getAllAdminDetail() {
    return this.http.get<{ mentors: any }>(
      `${this.BACKEND_URL}admin/get-all/mentor`
    );
  }

  // add admin
  addNewAdmin(mentor: any) {
    return this.http.post<{ mentor: any }>(
      `${this.BACKEND_URL}admin/add`,
      mentor
    );
  }

  // Delete admin
  deleteAdminById(id: string) {
    return this.http.delete(`${this.BACKEND_URL}admin/delete/${id}`);
  }

  getStudentDetail(id: string) {
    return this.http.get<{ user: any }>(
      `${this.BACKEND_URL}admin/home/detail/${id}`
    );
  }

  getStudentActivityDetailByIndex(id: string, activity: string) {
    return this.http.get<{ activity: any[] }>(
      `${this.BACKEND_URL}admin/home/${id}/${activity}`
    );
  }

  getStudentActivityDetail(id: string) {
    return this.http.post<{ message: string; activites: any[] }>(
      `${this.BACKEND_URL}admin/home/user/${id}`,
      id
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
