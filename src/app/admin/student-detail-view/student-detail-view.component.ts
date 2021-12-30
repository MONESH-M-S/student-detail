import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-student-detail-view',
  templateUrl: './student-detail-view.component.html',
  styleUrls: ['./student-detail-view.component.scss'],
})
export class StudentDetailViewComponent implements OnInit, OnDestroy {
  id: string;
  isLoading = false;
  paperCount: number = 0;
  projectCount: number = 0;
  total: number = 0;
  studentDetail: any;
  activityArray: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.isAdmin = true;
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
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
    this.adminService.getStudentMarkTable(this.id).subscribe((data) => {
      this.total = data.mark[0].total;
    });
    this.adminService.getStudentActivityDetail(this.id).subscribe((data) => {
      for (let i = 0; i < data.activites.length; i++) {
        if (data.activites[i].type === 'paper') {
          this.paperCount++;
        } else if (data.activites[i].type === 'project') {
          this.projectCount++;
        }
      }
    });
    this.isLoading = false;
  }

  onRouteMarkSplitup() {
    this.router.navigate([`admin/home/detail/${this.id}/mark-splitup`]);
  }

  ngOnDestroy() {
    this.paperCount = 0;
    this.projectCount = 0;
  }
}
