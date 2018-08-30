import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public username:string;
  public email:string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  createUser() {
    this.userService.createUser(this.username, this.email);
  }

  retrieveUsers() {
    this.userService.getUsers();
    console.log(this.userService.getUsers());
  }

}
