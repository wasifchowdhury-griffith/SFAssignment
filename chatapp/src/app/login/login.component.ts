import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username:string;
  public password:string;
  public adminUser:string;


  constructor(private router:Router, private form:FormsModule, private userService:UserService) { }

  ngOnInit() {
    console.log(this.userService.getUsers());
  }

  loginUser(event){
    event.preventDefault();
  for (let i=0; i < this.userService.getUsers().length; i++){
    if (this.username == this.userService.getUsers()[i].username && this.password == "123"){
      if(typeof(Storage)!=='undefined'){
        sessionStorage.setItem('username', this.username);
        this.router.navigate(['/chat']);
        alert('Successfully logged in');
      }
    } else {
      alert('Username and password were incorrect');
    }
  }
}
}

  //   for (let i=0; i < this.userService.getUsers().length; i++){
  //     if (this.username == (this.userService.getUsers()[i].username) && this.password == "123"){
  //       this.userService.successfullLogin();
  //       this.router.navigate(['/chat']);
  //   } else {
  //     alert ('Username and email were incorrect');
  //   }
  // }
