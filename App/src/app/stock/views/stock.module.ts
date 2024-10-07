import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';
import { ListComponent } from './list/list.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: StockComponent,
        children: [
          {
            path: '',
            component: ListComponent,
          },
          {
            path: 'novo-produto',
            component: NewProductComponent,
          },
          {
            path: 'novo-produto/:id',
            component: NewProductComponent,
          },
          {
            path: 'nova-nota',
            component: NewInvoiceComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [StockComponent],
  declarations: [
    StockComponent,
    ListComponent,
    NewProductComponent,
    NewInvoiceComponent,
  ],
})
export class StockModule {}
