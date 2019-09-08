import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  task: any;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.taskService.getTask(this.id)
      .subscribe(task => {
        this.task = task;
      }, error => console.log(error));
  }

  returnList() {
    this.router.navigate(['tasks']);
  }

}
