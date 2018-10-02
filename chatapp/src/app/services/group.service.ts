import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private api:string = 'http://localhost:3000/api/';
  private groupName: String;

  constructor(private http: HttpClient) {}

  //create group function
  createGroup(data){
    console.log(data);
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'group/create', body, httpOptions);
  }

  //delete specified group
  deleteGroup(groupName){
    console.log(groupName);
    return this.http.delete(this.api + 'group/delete/' + groupName);
  }

  //get groups  
  getGroups(username){
    // let body = JSON.stringify(data);
    // console.log(data);
    console.log("getgroups function working " + username);
    console.log(this.api + 'groups');
    return this.http.get(this.api + 'groups');
  }

  //sort groups that current user is apart of
  sortGroups(array, username){
    let resArray = [];
    for (let i=0; i<array.length; i++){
      if ((array[i].members.name.includes(username)) || (array[i].admins.name.includes(username))){
        resArray.push(array[i]);
      }
    }
    return resArray;
  }

  //set current selected group
  setCurrentGroup(groupName){
    this.groupName = groupName;
    console.log(this.groupName);
  }

  //get current selected group
  getCurrentGroup(){
    return this.groupName;
  }
}

