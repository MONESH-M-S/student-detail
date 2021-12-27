import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [TableModule, TooltipModule, ButtonModule],
  exports: [TableModule, TooltipModule, ButtonModule],
})
export class PrimengModule {}
