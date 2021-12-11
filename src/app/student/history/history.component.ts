import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  userActivites: any[];
  id: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.authService.getUserActivity(this.id).subscribe((activity) => {
      this.userActivites = activity.activity;
    });
  }

  onDeleteActivity(activityId: string) {
    this.authService.deleteActivity(activityId).subscribe((res) => {
      if (res) {
        this.authService.getUserActivity(this.id).subscribe((activity) => {
          this.userActivites = activity.activity;
        });
      }
    });
    if (this.userActivites.length > 0) {
      this.router.navigate([
        `/student/detail-upload/${this.userActivites[0].creator}`,
      ]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
