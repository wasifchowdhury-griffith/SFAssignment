import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username:string;
  public email:string;
  users =[
  ];

  constructor() { 
    this.createAdmin("wasif", "wasif@yahoo.com");
    this.createAdmin("louis", "louis@hotmail.com")
  }

  createAdmin(username, email){
    this.users.push({username, email});
  }

  getUsers() {
    return this.users;
  }

  successfullLogin(){
    console.log("You have successfully logged in");
    if(typeof(Storage)!=='undefined'){
      sessionStorage.setItem('username', this.username);
    }
  }

  createUser(username, email) {
    this.users.push({username, email})
    console.log(this.users);
  }

  deleteUser() {

  }

}
