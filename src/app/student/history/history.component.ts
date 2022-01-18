import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  userActivites: any[];
  id: string;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.authService.getUserActivity(this.id).subscribe((activity) => {
      this.userActivites = activity.activity;
      this.isLoading = false;
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
      let activity: string;
      let mark = 0 - res.activity.mark;
      let id = res.activity.creator;
      if (res.activity?.type === 'paper') {
        this.authService
          .updateUserMark('paper', mark, id)
          .subscribe((res) => {});
      } else if (res.activity?.type === 'project') {
        this.authService
          .updateUserMark('project', mark, id)
          .subscribe((res) => {});
      } else if (res.activity.activity === 'club') {
        this.authService
          .updateUserMark('club', mark, id)
          .subscribe((res) => {});
      } else {
        activity = res.activity.activityForDeleting;
        this.authService
          .updateUserMark(activity, mark, id)
          .subscribe((res) => {});
      }
      this.authService.getUserActivity(this.id).subscribe((activity) => {
        this.userActivites = activity.activity;
      });
    });
    if (this.userActivites.length > 0) {
      this.router.navigate([
        `/student/detail-upload/${this.userActivites[0].creator}`,
      ]);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.userActivites = [];
  }
}
