import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { FormsModule } from '@angular/forms';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { StudentDetailViewComponent } from './admin/student-detail-view/student-detail-view.component';
import { AdminService } from './admin/admin.service';
import { DetailedTableComponent } from './admin/student-detail-view/detailed-table/detailed-table.component';
import { SignupComponent } from './student/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    AdminMainComponent,
    StudentDetailViewComponent,
    DetailedTableComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {}
