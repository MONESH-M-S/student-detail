import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AddAdminComponent } from './admin/admin-main/admin-section/add-admin/add-admin.component';
import { AdminSectionComponent } from './admin/admin-main/admin-section/admin-section.component';
import { MarksTableComponent } from './admin/admin-main/marks-table/marks-table.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { TableContentComponent } from './admin/student-detail-view/detailed-table/table-content/table-content.component';
import { MarkSplitupComponent } from './admin/student-detail-view/mark-splitup/mark-splitup.component';
import { StudentDetailViewComponent } from './admin/student-detail-view/student-detail-view.component';
import { HistoryComponent } from './student/history/history.component';
import { SignupComponent } from './student/signup/signup.component';
import { StudentAddDetailComponent } from './student/student-add-detail/student-add-detail.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'admin/show-marks',
    component: MarksTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/home/:mentor',
    component: AdminMainComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/add',
    component: AddAdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/:id', 
    component: AdminSectionComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/home/detail/:id',
    component: StudentDetailViewComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/home/detail/:id/mark-splitup',
    component: MarkSplitupComponent,
    canActivate: [AdminGuard],
  },
  { path: 'student-signup', component: SignupComponent },
  { path: 'student/detail-upload/:id', component: StudentAddDetailComponent },
  { path: 'student/detail-upload/:id/mark-splitup', component: MarkSplitupComponent },
  { path: 'student/detail-upload/:id/history', component: HistoryComponent },
  { path: '**', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
