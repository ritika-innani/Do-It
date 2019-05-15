import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    message;
    messageClass;

    constructor(private authenticateService: AuthenticateService, private router: Router) {}

    // Function to submit form
    onSubmit(value: any) {
        console.log(value);
        var self = this;

    // Function from authentication service to register user
    this.authenticateService.registerUser(value).subscribe((data) => {
        if (!data.success) {
            this.messageClass = 'alert alert-danger'; 
            this.message = data.message;

        } else {
            self.router.navigate(['/login']); 
        }
    });
    }

    ngOnInit() {
       
    }
}

