import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mark-splitup',
  templateUrl: './mark-splitup.component.html',
  styleUrls: ['./mark-splitup.component.scss'],
})
export class MarkSplitupComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
