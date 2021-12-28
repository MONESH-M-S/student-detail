import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [TableModule, TooltipModule, ButtonModule, TagModule],
  exports: [TableModule, TooltipModule, ButtonModule, TagModule],
})
export class PrimengModule {}
