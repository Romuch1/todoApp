import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  createForm: FormGroup;
  @Output() task = new EventEmitter<any>();
  isSubmitted = false;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      complete: false
    });
  }

  getNameMessage() {
    return this.createForm.controls.name.hasError('required') ? 'You must enter a value' : '';
  }

  getDescriptionMessage() {
    return this.createForm.controls.description.hasError('required') ? 'You must enter a value' : '';
  }

  get formControls() {
    return this.createForm.controls;
  }

  createTask() {
    this.isSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }
    this.taskService.createTask(this.createForm.value).pipe(first())
      .subscribe(task => {
        this.task.emit(task);
        this.createForm.reset();
        Object.keys(this.formControls).forEach(key => {
          this.createForm.get(key).setErrors(null) ;
        });
      });
  }

}
