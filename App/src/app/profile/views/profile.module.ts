import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: DetailComponent,
          },
          {
            path: 'editar',
            component: EditComponent,
          },
          {
            path: 'configuracoes',
            component: ConfigurationComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [ProfileComponent],
  declarations: [
    ProfileComponent,
    DetailComponent,
    EditComponent,
    ConfigurationComponent,
  ],
})
export class ProfileModule {}
