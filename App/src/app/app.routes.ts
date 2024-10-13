import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/views/layout/layout.component';
import { AuthComponent } from './auth/views/auth.component';
import { HomeComponent } from './home/views/home.component';
import { TaskComponent } from './task/views/task.component';
import { NewTaskComponent } from './task/views/new-task/new-task.component';
import { ListUserComponent } from './user/views/list/list-user.component';
import { ProfileComponent } from './profile/views/profile.component';
import { DetailComponent } from './profile/views/detail/detail.component';
import { UserComponent } from './user/views/user.component';
import { NewUserComponent } from './user/views/new-user/new-user.component';
import { ListTaskComponent } from './task/views/list/list-task.component';

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
            path: '',
            component: ListTaskComponent,
          },
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
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: DetailComponent,
          },
        ],
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: '',
            component: ListUserComponent,
          },
          {
            path: 'new-user',
            component: NewUserComponent,
          },
          {
            path: 'new-user/:id',
            component: NewUserComponent,
          },
        ],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];
