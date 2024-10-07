import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './views/header/header.component';
import { ContaFilterComponent } from './views/conta-filter/conta-filter.component';
import { EstoqueFilterComponent } from './views/estoque-filter/estoque-filter.component';
import { VendaFilterComponent } from './views/venda-filter/venda-filter.component';
import { LayoutComponent } from './views/layout/layout.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [],
  exports: [
    HeaderComponent,
    VendaFilterComponent,
    EstoqueFilterComponent,
    ContaFilterComponent,
    LayoutComponent,
  ],
  declarations: [
    HeaderComponent,
    VendaFilterComponent,
    EstoqueFilterComponent,
    ContaFilterComponent,
    LayoutComponent,
  ],
})
export class SharedModule {}
