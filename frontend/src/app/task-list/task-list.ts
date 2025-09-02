import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Tasc } from '../task-service';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  
})
export class TaskList {
  tascs$: Observable<Tasc[]>;

  constructor(private tascService: TaskService, private cdr: ChangeDetectorRef, private router: Router) {
    this.tascs$ = this.tascService.loadTasks();
  }
  isModalOpen = false

  tascTitle = '';
  description = '';
    
  get title(): string | null {
    return "Tascs - " +  localStorage.getItem('name');
  }

  submitTask() {
  this.tascService.addTasc(this.tascTitle, this.description).subscribe({
    next: () => {
      this.closeModal();
      this.tascs$ = this.tascService.loadTasks();
      this.tascTitle =  '';
      this.description= '';
    },
    error: (err) => console.error(err)
  });
  }

  deleteTask(id: number | string) {
  this.tascService.deleteTasc(id).subscribe({
    next: () => {
      this.tascs$ = this.tascService.loadTasks();
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}


    openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['']);
  }

}
