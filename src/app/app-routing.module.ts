import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { StudentDetailViewComponent } from './admin/student-detail-view/student-detail-view.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
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
  { path: '**', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
