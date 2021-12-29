import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitted = false;
  errorMsg: string = '';
  imageDisplay!: string | null;

  constructor(
    private formBulider: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBulider.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      roll: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      mentor: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ image: file });
    this.signupForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    const form = this.signupForm.value;

    this.authService
      .onSignup(
        form.name,
        form.email,
        form.roll,
        form.password,
        form.mentor,
        form.image
      )
      .subscribe(
        (res) => {
          {
            this.snackbar.open('Signup Successful!', '', {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['mat-toolbar', 'mat-accent'],
            });
            this.isSubmitted = false;
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.errorMsg = err.message;
          this.isSubmitted = false;
          this.snackbar.open('Student Signup Failed!', '', {
            duration: 6000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        }
      );
    window.setTimeout(() => {
      this.errorMsg = '';
    }, 6000);
  }
}
