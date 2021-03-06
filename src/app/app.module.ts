import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { StudentDetailViewComponent } from './admin/student-detail-view/student-detail-view.component';
import { AdminService } from './admin/admin.service';
import { DetailedTableComponent } from './admin/student-detail-view/detailed-table/detailed-table.component';
import { SignupComponent } from './student/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentAddDetailComponent } from './student/student-add-detail/student-add-detail.component';
import { StudentDetailFormComponent } from './student/student-add-detail/student-detail-form/student-detail-form.component';
import { HistoryComponent } from './student/history/history.component';
import { ClubComponent } from './student/student-add-detail/club/club.component';
import { SportsComponent } from './student/student-add-detail/sports/sports.component';
import { VacComponent } from './student/student-add-detail/vac/vac.component';
import { OtherComponent } from './student/student-add-detail/other/other.component';
import { InternshipComponent } from './student/student-add-detail/internship/internship.component';
import { DialogComponent } from './student/history/dialog/dialog.component';
import { PrimengModule } from './primeng.module';
import { ImageDialogComponent } from './admin/student-detail-view/detailed-table/image-dialog/image-dialog.component';
import { MarkSplitupComponent } from './admin/student-detail-view/mark-splitup/mark-splitup.component';
import { MarksTableComponent } from './admin/admin-main/marks-table/marks-table.component';
import { AdminSectionComponent } from './admin/admin-main/admin-section/admin-section.component';
import { AddAdminComponent } from './admin/admin-main/admin-section/add-admin/add-admin.component';
import { DeleteDialogComponent } from './admin/admin-main/admin-section/delete-dialog/delete-dialog.component';
import { TableContentComponent } from './admin/student-detail-view/detailed-table/table-content/table-content.component';
import { SportsTableComponent } from './admin/student-detail-view/detailed-table/table-content/sports-table/sports-table.component';
import { OtherTableComponent } from './admin/student-detail-view/detailed-table/table-content/other-table/other-table.component';
import { InternTableComponent } from './admin/student-detail-view/detailed-table/table-content/intern-table/intern-table.component';
import { GateTableComponent } from './admin/student-detail-view/detailed-table/table-content/gate-table/gate-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    AdminMainComponent,
    StudentDetailViewComponent,
    DetailedTableComponent,
    SignupComponent,
    StudentAddDetailComponent,
    StudentDetailFormComponent,
    HistoryComponent,
    ClubComponent,
    SportsComponent,
    VacComponent,
    OtherComponent,
    InternshipComponent,
    DialogComponent,
    ImageDialogComponent,
    MarkSplitupComponent,
    MarksTableComponent,
    AdminSectionComponent,
    AddAdminComponent,
    DeleteDialogComponent,
    TableContentComponent,
    SportsTableComponent,
    OtherTableComponent,
    InternTableComponent,
    GateTableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {}
