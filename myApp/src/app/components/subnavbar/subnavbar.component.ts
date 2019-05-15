import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.css']
})
export class SubnavbarComponent implements OnInit {
  user;
  usercompany;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.usercompany = this.user.company;
  }

}
