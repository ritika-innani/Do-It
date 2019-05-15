import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  username;
  usercompany;
  message;
  messageClass;

  @Output()
  taskAdded:EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(){
    this.authenticateService.getProfile().subscribe(data =>{
      if(!data.success){
        console.log(data.message);
      }else{
        this.username = data.user.name;
        this.usercompany = data.user.company;
      }
    });
  }

  onSubmit(value: any) {
    // Function from authentication service to register user
    this.authenticateService.updateProfile(value).subscribe((data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        alert(data.message);
        this.user = JSON.parse(localStorage.getItem("user"));
        this.user.name = value.name;
        this.user.company = value.company;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.getUserProfile();
        this.taskAdded.emit('complete');
      }
    });
  }
}
