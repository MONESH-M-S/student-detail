import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-student-detail-view',
  templateUrl: './student-detail-view.component.html',
  styleUrls: ['./student-detail-view.component.scss'],
})
export class StudentDetailViewComponent implements OnInit, OnDestroy {
  paperCount: number = 0;
  projectCount: number = 0;
  otherCount: number = 0;
  studentDetail: any;
  activityArray: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.isAdmin = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.adminService.getStudentDetail(params['id']).subscribe(
          (data) => {
            this.studentDetail = data[0];
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
    this.route.params.subscribe((params) => {
      if (params) {
        this.adminService
          .getStudentActivityDetail(params['id'])
          .subscribe((data) => {
            for (let i = 0; i < data.activites.length; i++) {
              if (data.activites[i].type === 'paper') {
                this.paperCount++;
              } else if (data.activites[i].type === 'project') {
                this.projectCount++;
              } else if (data.activites[i].type === 'other') {
                this.otherCount++;
              }
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.paperCount = 0;
    this.projectCount = 0;
    this.otherCount = 0;
  }
}
