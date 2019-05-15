import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
    user;

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.authenticateService.getProfile().subscribe(profile => {
        this.user = profile.user;
    });
  }

}
