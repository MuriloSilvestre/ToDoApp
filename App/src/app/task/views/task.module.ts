import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';
import { ListComponent } from './list/list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent,
        children: [
          {
            path: '',
            component: ListComponent,
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
    ]),
  ],
  providers: [],
  exports: [TaskComponent],
  declarations: [TaskComponent, ListComponent, NewTaskComponent],
})
export class TaskModule {}
