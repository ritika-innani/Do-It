import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

import { AuthenticateService } from '../../../services/authenticate.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  user;
  id;
  project;
  task;
  description;
  assignee;
  priority;
  status;
  dateOfCreation;
  dueDate;
  date;
  allTeamMembers;

  @ViewChild('editTaskBlock') public editTaskBlock:ModalDirective;
  @Output()
  taskUpdated:EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticateService: AuthenticateService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getTeamMembers();
  }

  show(task){
    this.id = task._id;
    this.project = task.project;
    this.task = task.task;
    this.description = task.description;
    this.assignee = task.assignee;
    this.priority = task.priority;
    this.status = task.status;
    this.dateOfCreation = task.created_on;
    this.dueDate = new Date(task.due_date);
    this.editTaskBlock.show();
  }

  hide(){
    this.editTaskBlock.hide();
  }

  onUpdate(value: any, assignee, priority, status ){
    value._id = this.id;
    value.assignee = assignee;
    value.priority = priority;
    value.status = status;
    this.date = value.due_date;
    value.due_date = this.date.getTime();
    console.log(value);

    this.taskService.updateTask(value).subscribe((data) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert(data.message);
        this.hide();
        this.taskUpdated.emit('complete');
      }
    });
  }

  // getting all the team members
  getTeamMembers(){
    this.taskService.getTeamMembers(this.user.email).subscribe(data => {
      if(!data.success) {
        alert(data.message);
      } else{
        this.allTeamMembers = data.teams;

      }
    });
  }

}
