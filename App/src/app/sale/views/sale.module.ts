import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SaleComponent } from './sale.component';
import { ListComponent } from './list/list.component';
import { NewSaleComponent } from './new-sale/new-sale.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SaleComponent,
        children: [
          {
            path: '',
            component: ListComponent,
          },
          {
            path: 'nova-venda',
            component: NewSaleComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [SaleComponent],
  declarations: [SaleComponent, ListComponent, NewSaleComponent],
})
export class SaleModule {}
