import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  studentDetails: any = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.studentDetails = this.adminService.getStudentDetails();
  }

  onCardClick(id: number) {
    this.router.navigateByUrl(`admin/home/${id}`);
  }
}
