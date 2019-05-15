import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
  }

}
