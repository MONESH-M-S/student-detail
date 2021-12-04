import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class MaterialModule {}
