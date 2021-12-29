import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [TableModule, TooltipModule, ButtonModule, TagModule, DialogModule],
  exports: [TableModule, TooltipModule, ButtonModule, TagModule, DialogModule],
})
export class PrimengModule {}
