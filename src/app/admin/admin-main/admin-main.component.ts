import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  studentDetails: any;
  errMsg: string = '';
  mentor: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.mentor = params;
      }
    });
    this.adminService.getStudents(this.mentor).subscribe(
      (data) => {
        this.isLoading = false;
        this.studentDetails = data;
      },
      (err) => {
        this.errMsg = err;
      }
    );
  }

  onCardClick(id: number) {
    this.router.navigateByUrl(`admin/home/detail/${id}`);
  }

  onClicked() {
    this.router.navigateByUrl('admin/show-marks');
  }
}
