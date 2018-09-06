import { Injectable } from '@angular/core';
import { User } from '../classes/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[];
  private nextId: number;
  public currentUser;
  public currentUserId;

  constructor() { 
    let users = this.getUsers();

    if (users.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = users[users.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  //gets current user
  public getCurrentUser(){
    console.log("Current user is: " + this.currentUser + " " + this.currentUserId);
    return this.currentUser;
  }

  //retrieves username
  public getUsername() {
    console.log(localStorage.getItem('users'));
    return JSON.parse(localStorage.getItem('users')).user;
  }

  //function to create new user
  public createUser(user, email ): void {
    let usern = new User(this.nextId, user, email);
    let users = this.getUsers();
    users.push(usern);
    this.currentUserId = this.nextId;
    console.log("new users id is: " + this.currentUserId);
    this.setLocalStorageUsers(users);
    this.nextId++;
    this.currentUser = user;
    
    console.log("Current user is: " + this.currentUser);
  }

  //get users array
  public getUsers(): User[] {
    let localStorageItem = JSON.parse(localStorage.getItem('users'));
    return localStorageItem == null ? [] : localStorageItem.users;
  }

  //sets current user
  public setCurrentUser(user){
    this.currentUser = user;
    console.log("current user has been set to: " + this.currentUser);
  }

  //get current user by id
  public getUserId(){
    console.log(this.currentUserId);
    return this.currentUserId;
  }

  //remove users, requires id
  public removeUsers(id: number): void {
    let users = this.getUsers();
    users = users.filter((user) => user.id != id);
    this.setLocalStorageUsers(users);
    console.log("user has been removed");
  }

  //sets local storage of users, requires user
  private setLocalStorageUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify({ users: users}));
  }
}
