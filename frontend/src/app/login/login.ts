import { Component, NgZone } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginToggle = true;
  name = '';
  password = '';
  error = '';
  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private router: Router) {}

  toggleLogin() {
    this.loginToggle = !this.loginToggle;
  }


  register() {
    this.userService.register(this.name, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', this.name);
        this.error = "";
        //this.cdr.detectChanges();
        this.router.navigate(['/tasks']);
      },
    error: (err) => {
      this.error = 'Error: ' + (err.error?.message || 'Server error');
      this.cdr.detectChanges();
    }
    });
  }

  login() {
    this.userService.login(this.name, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', this.name);
        this.error = "";
        //this.cdr.detectChanges();
        this.router.navigate(['/tasks']);
      },
    error: (err) => {
      this.error = 'Error: ' + (err.error?.message || 'Server error');
      this.cdr.detectChanges();
    }
    });
  }
}
