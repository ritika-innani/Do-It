import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  user;
  allMessages;
  showMessages=false;

  constructor(private authenticateService: AuthenticateService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAllMessages();
  }

  getAllMessages(){
    this.taskService.getAllMessages(this.user.email).subscribe(data => {
      if(!data.success) {
        alert(data.message);
      } else{
        this.allMessages = data.messages;
        console.log(this.allMessages);
        if(this.allMessages.length != 0){
          this.showMessages = true;
        }
      }
    });
  }
}
