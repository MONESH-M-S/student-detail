import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  mode: string;
  editId: string;
  editAdmin: any;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (params) {
        if (params.params.add) {
          this.mode = 'add';
        } else if (params.params.edit) {
          this.mode = 'edit';
          this.editId = params.params.edit;
          this._editAdmin();
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  private _editAdmin() {
    this.adminService.getAdminDetailsById(this.editId).subscribe((res) => {
      if (res) {
        this.editAdmin = res.mentor[0];
      }
    });
  }
}
