import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BillComponent } from './bill.component';
import { ListToPayComponent } from './to-pay/list/list.component';
import { ListToReceiveComponent } from './to-receive/list/list.component';
import { NewSupplierComponent } from './to-pay/new-supplier/new-supplier.component';
import { NewBillComponent } from './to-pay/new-bill/new-bill.component';
import { NewClientComponent } from './to-receive/new-client/new-client.component';
import { ListSupplierComponent } from './to-pay/list-supplier/list-supplier.component';
import { ListClientComponent } from './to-receive/list-client/list-client.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BillComponent,
        children: [
          {
            path: 'a-receber',
            component: ListToReceiveComponent,
          },
          {
            path: 'a-pagar',
            component: ListToPayComponent,
          },
          {
            path: 'fornecedor/lista',
            component: ListSupplierComponent,
          },
          {
            path: 'fornecedor/novo',
            component: NewSupplierComponent,
          },
          {
            path: 'fornecedor/novo/:id',
            component: NewSupplierComponent,
          },
          {
            path: 'adicionar-dispesa',
            component: NewBillComponent,
          },
          {
            path: 'cliente/lista',
            component: ListClientComponent,
          },
          {
            path: 'cliente/novo',
            component: NewClientComponent,
          },
          {
            path: 'cliente/novo/:id',
            component: NewClientComponent,
          },
          { path: '**', redirectTo: 'a-receber', pathMatch: 'full' },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [BillComponent],
  declarations: [
    BillComponent,
    ListToPayComponent,
    ListToReceiveComponent,
    ListSupplierComponent,
    NewSupplierComponent,
    NewBillComponent,
    ListClientComponent,
    NewClientComponent,
  ],
})
export class BillModule {}
