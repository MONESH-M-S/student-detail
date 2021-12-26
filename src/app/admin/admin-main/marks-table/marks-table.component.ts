import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-marks-table',
  templateUrl: './marks-table.component.html',
  styleUrls: ['./marks-table.component.scss'],
})
export class MarksTableComponent implements OnInit {
  constructor(private location: Location, private adminService: AdminService) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
