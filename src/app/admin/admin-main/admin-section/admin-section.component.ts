import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss'],
})
export class AdminSectionComponent implements OnInit {
  mentors = [];
  isLoading = false;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getAllAdminDetail().subscribe((result) => {
      this.mentors = result.mentors;
      this.isLoading = false;
    });
  }
}
