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
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBulider.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      roll: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      mentor: new FormControl(null, [Validators.required]),
      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ file: file });
    this.signupForm.get('file').updateValueAndValidity();
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
    const formData = new FormData();

    for (const key of Object.keys(this.signupForm)) {
      const value = this.signupForm[key];
      formData.append(key, value);
    }

    this.authService.onSignup(formData).subscribe(
      (res) => {
        {
          this.snackbar.open('Signup Successful!', '', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
          this.isSubmitted = false;
          // this.dialog.open()
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
