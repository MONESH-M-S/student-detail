import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss'],
})
export class TableContentComponent implements OnInit {
  activityDetails = []
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (params) {
        console.log(params.params.table);
      }
    });
  }
}
