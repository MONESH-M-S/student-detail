import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean {
    if (this.adminService.isAdmin) {
      return true;
    }
    this.snackbar.open('Please login yorself as Admin', '', {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
    this.router.navigateByUrl(`/`);
    return false;
  }
}
