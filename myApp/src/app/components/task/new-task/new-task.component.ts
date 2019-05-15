import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';

import { AuthenticateService } from '../../../services/authenticate.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
    due_date = new Date();
    user;
    date;
    allTeamMembers;

    @ViewChild('newTaskBlock') public newTaskBlock:ModalDirective;
    @Output()
    taskAdded:EventEmitter<string> = new EventEmitter<string>();

    constructor(private authenticateService: AuthenticateService,
    private taskService: TaskService,
    private router: Router) { }

    ngOnInit() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getTeamMembers();
    }

    show(){
        this.newTaskBlock.show();
    }

    hide(){
        this.newTaskBlock.hide();
    }

    onSubmit(value: any, assignee:any, priority:any) {
        console.log(value);
        value._id = this.user.userId;
        value.assignee = assignee;
        value.priority = priority;
        value.status = "To Do";
        this.date = value.due_date;
        value.due_date = this.date.getTime();
        console.log(value.due_date);

        // Function from authentication service to register user
        this.taskService.newTask(value).subscribe((data) => {
            if (!data.success) {
                alert(data.message);
            } else {
                this.hide();
                this.taskAdded.emit('complete');
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
