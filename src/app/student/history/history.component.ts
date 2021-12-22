import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogComponent } from './dialog/dialog.component';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.authService.getUserActivity(this.id).subscribe((activity) => {
      this.userActivites = activity.activity;
    });
  }

  openDialog(activityId: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.onDeleteActivity(activityId);
      }
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
