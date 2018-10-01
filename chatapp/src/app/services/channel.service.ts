import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }
  private api:string = 'http://localhost:3000/api/';

  getChannels(groupName){
    console.log("get channels function working " + groupName);
    return this.http.get(this.api + 'channels');
  }
  
}
