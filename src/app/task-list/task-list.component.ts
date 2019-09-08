import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { first } from 'rxjs/operators';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task;
  complete: boolean;
  task: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getAllTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).pipe(first()).subscribe(() => {
      this.getAllTasks();
    });
  }

  openTask(id: number) {
    this.router.navigate(['tasks', id]);
  }

  addTask(data) {
    this.newTask = data;
    this.getAllTasks();
  }

  updateTask(id: number) {
    this.taskService.getTask(id).subscribe(data => {
      this.task = data;
      this.task.complete = !this.task.complete;
      this.taskService.updateTask(this.task).subscribe(data1 => {
        this.getAllTasks();
      });
    });
  }

  private getAllTasks() {
    this.taskService.getTasks().pipe(first())
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

}
