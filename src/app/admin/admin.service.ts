import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  studentDetails = [
    { id: 1, roll: '19EIR049', name: 'Avnqini', paper: 3, project: 3 },
    { id: 2, roll: '19EIR050', name: 'Bwjwign', paper: 1, project: 5 },
    { id: 3, roll: '19EIR051', name: 'bwgiwg', paper: 3, project: 3 },
    { id: 4, roll: '19EIR052', name: 'cggwkgnwig', paper: 5, project: 1 },
    { id: 5, roll: '19EIR053', name: 'fwgje', paper: 3, project: 4 },
    { id: 6, roll: '19EIR054', name: 'tejjwgw', paper: 3, project: 3 },
    { id: 7, roll: '19EIR055', name: 'wwsjgww', paper: 1, project: 5 },
    { id: 8, roll: '19EIR056', name: 'ggsjss', paper: 3, project: 3 },
    { id: 9, roll: '19EIR057', name: 'sfdfjvsks', paper: 5, project: 1 },
  ];
  isAdmin: boolean = false;

  constructor(private fireAuth: AngularFireAuth) {}

  adminLogin(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  getStudentDetails() {
    return this.studentDetails;
  }

  getStudentDetail(index: number) {
    return this.studentDetails[index - 1];
  }
}
