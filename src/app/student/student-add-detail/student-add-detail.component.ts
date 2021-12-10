import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-add-detail',
  templateUrl: './student-add-detail.component.html',
  styleUrls: ['./student-add-detail.component.scss'],
})
export class StudentAddDetailComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
  }

  onClick() {
    if (this.id) {
      this.router.navigate([`/student/detail-upload/${this.id}/history`]);
    }
  }
}
