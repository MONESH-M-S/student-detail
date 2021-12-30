import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-other-table',
  templateUrl: './other-table.component.html',
  styleUrls: ['./other-table.component.scss']
})
export class OtherTableComponent implements OnInit {
  activityDetails = [];
  id: string;
  errMsg: string;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService
      .getStudentActivityDetailByIndex(this.id, 'other-ncc')
      .subscribe(
        (res) => {
          this.activityDetails = res.activity;
        },
        (err) => {
          console.log(err);
          this.errMsg = err;
        }
      );
  }
}
