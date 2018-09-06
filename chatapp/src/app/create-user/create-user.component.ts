import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  private user:string;
  private email:string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  //function to create new user, navigates to login
  createUser() {
    console.log(this.user);
    console.log(this.email);
    this.userService.createUser(this.user, this.email);
    this.router.navigate([('/login')]);
  }

  //function to retrieve users
  retrieveUsers() {
    this.userService.getUsers();
    console.log(this.userService.getUsers());
  }

  //function to go back
  goBack(){
    history.back();
  }

}
