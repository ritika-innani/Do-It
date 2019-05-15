import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DeleteTaskComponent} from './delete-task/delete-task.component';
import { NewTaskComponent} from './new-task/new-task.component';
import { UpdateTaskComponent} from './update-task/update-task.component';
import { AuthenticateService } from '../../services/authenticate.service';
import { TaskService } from '../../services/task.service';
import { MemberFilterPipe } from './memberFilter.pipe';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
    user;
    allTasks;
    allTeamMembers;
    allUsers;
    displaySidenav;
    priority;
    member;
    @ViewChild('deletePopup') deletePopup :DeleteTaskComponent;
    @ViewChild('newTaskBlock') newTaskBlock :NewTaskComponent;
    @ViewChild('editTaskBlock') editTaskBlock :UpdateTaskComponent;

    constructor(private authenticateService: AuthenticateService,
    private taskService: TaskService,
    private router: Router,
    private viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        this.displaySidenav = 'hide-sidenav';
        this.user = JSON.parse(localStorage.getItem("user"));
        this.getAllTasks();
        this.getTeamMembers();
        this.getUsers();
    }

    //for getting all the tasks of the user
    getAllTasks(){
        this.taskService.getAllTasks(this.user.userId).subscribe(data => {
          if(!data.success) {
              alert(data.message);
          } else{
            this.allTasks = data.tasks;
          }
        });
    }

    //for getting all the tasks from the event from child components
    getTasks(event){
        this.getAllTasks();
    }

    //sidebar toggle
    sidenavToggle(){
      if(this.displaySidenav == 'hide-sidenav') {
        this.displaySidenav = 'show-sidenav';
      } else{
        this.displaySidenav = 'hide-sidenav';
      }
    }

    // adding a new team member
    addMember(memberId){
      let member = {
        memberId: memberId,
        userEmail: this.user.email
      }
      this.taskService.addTeamMember(member).subscribe((data) => {
        if (!data.success) {
          (data.message);
        } else {
          this.member = "";
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

    //to get all users
    getUsers(){
      this.authenticateService.getAllUsers(this.user.company).subscribe(data => {
        if(!data.success){
          console.log(data.message);
        } else{
          this.allUsers = data.users;
          //console.log(this.allUsers.filter(x => this.allTeamMembers.indexOf(x) < 0 ));
        }
      })
    }

    function(value){
      console.log(value);
      this.member = value;
    }
}
