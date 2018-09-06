import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: string;
  public email: string;
  public currentUser: string;
  users = this.userService.getUsers();
  public currentUserId: string;
  public cUser;
  connection;

  constructor(private router:Router, 
    private form:FormsModule, 
    private userService:UserService,
    private socketService: SocketService) { }
  
  //initialise creates admin if not existing, admin admin@admin.com
  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {});
    console.log(this.users);
    if (this.userExists("admin")){
      console.log("admin already exists");
    } else {
      console.log("admin created");
      this.userService.createUser("admin", "admin@admin.com");
    }
  }

  //ends connection with socket
  ngOnDestroy(){
    if(this.connection){
      this.connection.unsubscribe();
    }
  }

  //navigate to create-user
  register(){
    this.router.navigateByUrl('create-user');
  }

  //retrieve users
  retrieveUsers() {
    this.userService.getUsers();
    console.log(this.userService.getUsers());
  }

  //login user
  loginUser(event) {
    event.preventDefault();
    
    console.log(this.users);
    console.log(this.user);
    if ((this.userExists(this.user) == true) && (this.emailExists(this.email) == true)){
      this.router.navigateByUrl('dashboard');
      this.userService.setCurrentUser(this.user);
      console.log(this.currentUserId);
    } else {
      alert('Failed to login');
    }
  }

  //check if user exists
  public userExists(username){
    return this.users.some(function(el){
      return el.user == username;
    });
  }

  //check if email exists
  public emailExists(email){
    return this.users.some(function(el){
      return el.email == email;
    });
  }

  //get current user
  public getCurrentUser(){
    console.log(this.user);
  }
}
