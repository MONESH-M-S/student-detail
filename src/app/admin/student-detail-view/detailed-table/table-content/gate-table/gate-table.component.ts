import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-gate-table',
  templateUrl: './gate-table.component.html',
  styleUrls: ['./gate-table.component.scss'],
})
export class GateTableComponent implements OnInit {
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
      .getStudentActivityDetailByIndex(this.id, 'vac-gate')
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
