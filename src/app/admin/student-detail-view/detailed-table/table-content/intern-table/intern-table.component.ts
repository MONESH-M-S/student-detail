import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {
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
      .getStudentActivityDetailByIndex(this.id, 'internship-placement')
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

