import { AuthGuard } from './helpers/authentication.selectors';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/views/layout/layout.component';
// Components

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/views/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/views/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'estoque',
        loadChildren: () =>
          import('./stock/views/stock.module').then((m) => m.StockModule),
      },
      {
        path: 'venda',
        loadChildren: () =>
          import('./sale/views/sale.module').then((m) => m.SaleModule),
      },
      {
        path: 'conta',
        loadChildren: () =>
          import('./bill/views/bill.module').then((m) => m.BillModule),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./profile/views/profile.module').then((m) => m.ProfileModule),
      },
      { path: '', redirectTo: 'checkout', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
