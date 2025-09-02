import { Routes } from '@angular/router';
import { Login } from './login/login';
import { TaskList } from './task-list/task-list';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'tasks', component: TaskList },
  { path: '**', redirectTo: '/login' }
];
