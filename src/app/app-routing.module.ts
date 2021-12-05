import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { StudentDetailViewComponent } from './admin/student-detail-view/student-detail-view.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'admin/home',
    component: AdminMainComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/home/:id',
    component: StudentDetailViewComponent,
    canActivate: [AdminGuard],
  },
  { path: 'student', component: StudentComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
