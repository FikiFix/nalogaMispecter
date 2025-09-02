import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import {TaskList} from './task-list/task-list'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, TaskList, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
