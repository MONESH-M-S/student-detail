import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    HomeComponent,
    AdminMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
