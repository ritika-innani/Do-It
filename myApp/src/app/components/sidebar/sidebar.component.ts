import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    content = "arrow_drop_down";
    user;
    allTeamMembers;

    constructor(private taskService: TaskService) {

    }

    ngOnInit() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getTeamMembers();
    }

    changeArrow(){
        if(this.content == "arrow_drop_down"){
            this.content = "arrow_drop_up";
        } else{
             this.content = "arrow_drop_down";
        }
    }

    getTeamMembers(){
      this.taskService.getTeamMembers(this.user.email).subscribe(data => {
        if(!data.success) {
          alert(data.message);
        } else{
          this.allTeamMembers = data.teams;
          console.log(this.allTeamMembers);
        }
      });
    }

}
