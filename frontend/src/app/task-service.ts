import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

export interface Tasc {
    id : number;
    title: string;
    description: string;
    timestamp: string;
    userId: string | number;

}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'https://nalogamispecter.onrender.com/api';
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getName(): string | null{
    return localStorage.getItem('name')
  }

  loadTasks(): Observable<Tasc[]> {
    const token = this.getToken();
    return this.http.get<Tasc[]>(`${this.apiUrl}/tasc`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addTasc(title : string, description : string) : Observable<Tasc> {
      const token = this.getToken();
      return this.http.post<Tasc>(
        `${this.apiUrl}/tasc`, 
        {title, description}, 
        {headers: { Authorization: `Bearer ${token}` }}
      );
  }
  deleteTasc(id : number | string){
    const token = this.getToken();
    return this.http.delete<any>(
      `${this.apiUrl}/tasc/${id}`,
      {headers: { Authorization: `Bearer ${token}` }}
    )
  }
}
