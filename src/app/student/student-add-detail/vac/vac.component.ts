import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { mimeType } from '../../signup/mime-type.validator';

@Component({
  selector: 'app-vac',
  templateUrl: './vac.component.html',
  styleUrls: ['./vac.component.scss'],
})
export class VacComponent implements OnInit {
  form: FormGroup;
  imageDisplay!: string | null;
  isSubmitted: boolean = false;
  id: string;
  errorMsg: any;

  constructor(
    private formBulider: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.form = this.formBulider.group({
      event: new FormControl(null, [Validators.required]),
      venue: new FormControl(),
      mode: new FormControl(null),
      year: new FormControl(0),
      date: new FormControl(null),
      endDate: new FormControl(null),
      type: new FormControl(null, [Validators.required]),
      mark: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.year == null) {
      this.form.value.year = 0;
    }
    const f = new FormData();
    f.append('event', this.form.value.event);
    f.append('venue', this.form.value.venue);
    f.append('mode', this.form.value.mode);
    f.append('year', this.form.value.year);
    f.append('date', this.form.value.date);
    f.append('endDate', this.form.value.endDate);
    f.append('type', this.form.value.type);
    f.append('activity', 'vac-gate');
    f.append('activityForDeleting', 'vac_and_gate');
    f.append('mark', this.form.value.mark);
    f.append('image', this.form.value.image, this.form.value.event);
    f.append('id', this.id);
    const markForUpdate = this.form.value.mark;
    if (this.id) {
      this.authService.postUserData(f).subscribe(
        (res) => {
          {
            this.authService
              .updateUserMark('vac_and_gate', markForUpdate, this.id)
              .subscribe(
                (res) => {
                  this.snackbar.open('Certificate Added Successfully!', '', {
                    duration: 4000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    panelClass: ['mat-toolbar', 'mat-accent'],
                  });
                  this.isSubmitted = false;
                  this.imageDisplay = '';
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          this.errorMsg = err.message;
          this.isSubmitted = false;
          this.snackbar.open('Certificate Adding Failed!', '', {
            duration: 6000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        }
      );
      window.setTimeout(() => {
        this.imageDisplay = '';
        this.errorMsg = '';
      }, 6000);
      this.form.reset();
    }
  }
}
