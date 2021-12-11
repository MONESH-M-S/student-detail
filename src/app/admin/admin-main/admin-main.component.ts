import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  studentDetails: any;
  errMsg: string = '';

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStudents().subscribe(
      (data) => {
        this.studentDetails = data;
      },
      (err) => {
        this.errMsg = err;
      }
    );
  }

  onCardClick(id: number) {
    this.router.navigateByUrl(`admin/home/${id}`);
  }
}
