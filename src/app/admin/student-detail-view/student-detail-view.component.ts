import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-student-detail-view',
  templateUrl: './student-detail-view.component.html',
  styleUrls: ['./student-detail-view.component.scss'],
})
export class StudentDetailViewComponent implements OnInit {
  studentDetail: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.studentDetail = this.adminService.getStudentDetail(params['id']);
        console.log(this.studentDetail);
      }
    });
  }
}
