import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://nalogamispecter.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { name, password });
  }

  login(name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/login`, { name, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
}
