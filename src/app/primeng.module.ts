import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [TableModule, TooltipModule],
  exports: [TableModule, TooltipModule],
})
export class PrimengModule {}
