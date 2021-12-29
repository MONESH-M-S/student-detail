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
  isAdmin: boolean = false;
  id: string;

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
        this.studentDetails = data;
      },
      (err) => {
        this.errMsg = err;
      }
    );
    this.adminService.getAdminDetails(this.mentor).subscribe(
      (data) => {
        this.id = data.mentor[0]._id;
        this.isAdmin = data.mentor[0].isAdmin;
        this.isLoading = false;
      },
      (err) => {
        this.errMsg = err;
        console.log(err)
      }
    );
  }

  onCardClick(id: number) {
    this.router.navigateByUrl(`admin/home/detail/${id}`);
  }

  onClickedDetail() {
    this.router.navigateByUrl('admin/show-marks');
  }

  onClickedAdmin() {
    this.router.navigateByUrl(`admin/${this.id}`);
  }
}
