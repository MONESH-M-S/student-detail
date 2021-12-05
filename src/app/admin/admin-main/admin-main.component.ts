import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  studentDetails = [
    { id: 1, roll: '19EIR050', paper: 3, project: 3 },
    { id: 2, roll: '19EIR054', paper: 1, project: 5 },
    { id: 3, roll: '19EIR052', paper: 3, project: 3 },
    { id: 4, roll: '19EIR053', paper: 5, project: 1 },
    { id: 5, roll: '19EIR055', paper: 3, project: 4 },
    { id: 6, roll: '19EIR050', paper: 3, project: 3 },
    { id: 7, roll: '19EIR054', paper: 1, project: 5 },
    { id: 8, roll: '19EIR052', paper: 3, project: 3 },
    { id: 9, roll: '19EIR053', paper: 5, project: 1 },
  ];

  constructor() {}

  ngOnInit(): void {}

  onCardClick(id: number) {}
}
