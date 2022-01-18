import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-add-detail',
  templateUrl: './student-add-detail.component.html',
  styleUrls: ['./student-add-detail.component.scss'],
})
export class StudentAddDetailComponent implements OnInit {
  id: string;
  username: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.authService.getUser(this.id).subscribe((res) => {
      this.username = res[0].username;
    });
  }

  onClickHistoryButton() {
    if (this.id) {
      this.router.navigate([`/student/detail-upload/${this.id}/history`]);
    }
  }

  onClickMarkSplitupButton() {
    if (this.id) {
      this.router.navigate([`/student/detail-upload/${this.id}/mark-splitup`]);
    }
  }
}
