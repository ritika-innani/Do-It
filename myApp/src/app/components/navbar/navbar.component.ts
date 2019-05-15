import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
    taskName;
    task;
    user;
    username;
    useremail;

    constructor(private authenticateService: AuthenticateService,
    private router: Router,
    private taskService: TaskService) {}
//        router.events.subscribe(function(url: any){
//            url = router.url;
//            console.log(url);
//        });


    // onSubmit(value: any){
    //     this.taskName = value.search;
    //     this.taskService.getTaskByName(this.taskName).subscribe(data => {
    //       if(!data.success) {
    //           alert(data.message);
    //       } else{
    //         this.task = data.tasks;
    //         console.log(this.task);
    //       }
    //     });
    // }

    logOut(){
        this.authenticateService.logout();
        this.router.navigate(['/login']);
    }

    getTasks(event){
      this.ngOnInit();
    }

    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem("user"));
        this.username = this.user.name;
    }
}
