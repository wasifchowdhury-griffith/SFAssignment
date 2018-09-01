import { Injectable } from '@angular/core';
import { User } from '../classes/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[];
  private nextId: number;
  public currentUser;

  constructor() { 
    let users = this.getUsers();

    if (users.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = users[users.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  public getCurrentUser(){
    console.log(this.currentUser);
    return this.currentUser;
  }

  public getUsername() {
    console.log(localStorage.getItem('users'));
    return JSON.parse(localStorage.getItem('users')).user;
  }

  public createUser(user, email ): void {
    let usern = new User(this.nextId, user, email);
    let users = this.getUsers();
    users.push(usern);

    this.setLocalStorageUsers(users);
    this.nextId++;
    this.currentUser = user;
    console.log("Current user is");
  }

  public getUsers(): User[] {
    let localStorageItem = JSON.parse(localStorage.getItem('users'));
    return localStorageItem == null ? [] : localStorageItem.users;
  }

  public setCurrentUser(user){
    this.currentUser = user;
    console.log("current user has been set to: " + this.currentUser);
  }

  public removeUsers(id: number): void {
    let users = this.getUsers();
    users = users.filter((user) => user.id != id);
    this.setLocalStorageUsers(users);
  }

  private setLocalStorageUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify({ users: users}));
  }
}
