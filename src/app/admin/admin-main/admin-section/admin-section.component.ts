import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss'],
})
export class AdminSectionComponent implements OnInit {
  mentors = [];
  isLoading = false;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getAllAdminDetail().subscribe((result) => {
      this.mentors = result.mentors;
      this.isLoading = false;
    });
  }

  addOrEditAdmin() {
    this.router.navigate(['admin/add-edit'], { queryParams: { add: true } });
  }

  editAdmin(id: string) {
    if (id) {
      this.router.navigate(['admin/add-edit'], { queryParams: { edit: id } });
    }
  }

  goBack() {
    this.location.back();
  }

  deleteAdmin(id: string) {}
}
