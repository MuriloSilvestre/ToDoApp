import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './views/header/header.component';
import { LayoutComponent } from './views/layout/layout.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [],
  exports: [HeaderComponent, LayoutComponent],
  declarations: [HeaderComponent, LayoutComponent],
})
export class SharedModule {}
