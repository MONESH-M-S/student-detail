import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-detail-form',
  templateUrl: './student-detail-form.component.html',
  styleUrls: ['./student-detail-form.component.scss'],
})
export class StudentDetailFormComponent implements OnInit {
  form: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = new
  }

  onImagePicked(event: Event) {}

  onSubmit(form: NgForm) {
  }
}
