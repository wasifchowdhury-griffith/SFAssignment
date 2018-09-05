import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  private socket = io('http://localhost:3000');

  joinGroup(data){
    this.socket.emit('join', data);
  }

  setGroup(s){
    let gr = s;
    console.log(gr);
    return gr;
  }

  newUserJoined(){
    let observable = new Observable<{user: String, message:String}>(observer=>{
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect}
    });
    return observable;
  }

  leaveGroup(data){
    this.socket.emit('leave', data);
  }

  userLeftRoom(){
    let observable = new Observable<{user: String, message: String}>(observer=>{
    this.socket.on('left room', (data)=>{
      observer.next(data);
    });
    return () => {this.socket.disconnect();}
  });
  return observable;
  }

  sendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    let observable = new Observable<{user: String, message: String}>(observer=>{
      this.socket.on('new message', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }
}
