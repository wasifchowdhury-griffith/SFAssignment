import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: string;
  private email: string;
  public currentUser: string;

  constructor(private router:Router, private form:FormsModule, private userService:UserService) { }

  ngOnInit() {
    let admin = new User (0, "admin", "admin");
  }

  retrieveUsers() {
    this.userService.getUsers();
    console.log(this.userService.getUsers());
  }

  loginUser(event) {
    event.preventDefault();
    let users = this.userService.getUsers();
    console.log(users);

    function userExists(username){
      return users.some(function(el){
        return el.user == username;
      });
    }

    function emailExists(email){
      return users.some(function(el){
        return el.email == email;
      });
    }
    console.log(this.user);
    console.log(userExists(this.user));
    console.log(emailExists(this.email));
    if ((userExists(this.user) == true) && (emailExists(this.email) == true)){
      this.router.navigate(['/chat']);
      this.userService.setCurrentUser(this.user);
    } else {
      alert('Failed to login');
    }
  }

  public getCurrentUser(){
    console.log(this.user);
  }

//   loginUser(event){
//     event.preventDefault();
//   for (let i=0; i < this.userService.getUsers().length; i++){
//     if (this.username == this.userService.getUsers()[i].username && this.password == "123"){
//       if(typeof(Storage)!=='undefined'){
//         sessionStorage.setItem('username', this.username);
//         this.router.navigate(['/chat']);
//         alert('Successfully logged in');
//       }
//     } else {
//       alert('Username and password were incorrect');
//     }
//   }
// }
// }

  //   for (let i=0; i < this.userService.getUsers().length; i++){
  //     if (this.username == (this.userService.getUsers()[i].username) && this.password == "123"){
  //       this.userService.successfullLogin();
  //       this.router.navigate(['/chat']);
  //   } else {
  //     alert ('Username and email were incorrect');
  //   }
}
