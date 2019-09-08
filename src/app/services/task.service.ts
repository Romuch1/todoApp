import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTask(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
