import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/views/layout/layout.component';
import { AuthComponent } from './auth/views/auth.component';
import { HomeComponent } from './home/views/home.component';
import { TaskComponent } from './task/views/task.component';
import { NewTaskComponent } from './task/views/new-task/new-task.component';
import { ProfileComponent } from './profile/views/profile.component';
import { DetailComponent } from './profile/views/detail/detail.component';
import { EditComponent } from './profile/views/edit/edit.component';
import { ConfigurationComponent } from './profile/views/configuration/configuration.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'task',
        component: TaskComponent,
        children: [
          {
            path: 'new-task',
            component: NewTaskComponent,
          },
          {
            path: 'new-task/:id',
            component: NewTaskComponent,
          },
        ],
      },
      {
        path: 'perfil',
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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];
