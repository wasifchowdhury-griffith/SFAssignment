import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api:string = 'http://localhost:3000/api/';
  private currentUser: String;

  constructor(private http:HttpClient) {}

  login(data){
    let body = JSON.stringify(data);
    console.log(data);
    this.currentUser = data.username;
    console.log(this.currentUser);
    return this.http.post(this.api + 'login', body, httpOptions);
  }

  create(data){
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'user/create', body, httpOptions);
  }

  delete(username){
    return this.http.delete(this.api + 'user/delete/' + username);
  }

  getCurrentUser(){
    return this.currentUser;
  }

}
