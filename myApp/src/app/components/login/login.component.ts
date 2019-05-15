import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    messageClass;
    message;

    constructor(private authenticateService: AuthenticateService,
    private router: Router) { }
    
    ngOnInit():void {
        
    }

    onSubmit(value: any){
        var self = this;
        // for authenticating the user
        this.authenticateService.login(value).subscribe(data => {
          if(!data.success) {
            this.messageClass = 'alert alert-danger';
            this.message = data.message; 
          } else{
            this.authenticateService.storeUserData(data.token, data.user);
            self.router.navigate(['/dashboard']);
          }
        });
    }
}
