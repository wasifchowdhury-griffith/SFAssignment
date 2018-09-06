import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  private socket = io('http://localhost:3000');

  //join group with user and group
  joinGroup(data){
    this.socket.emit('join', data);
  }

  setGroup(s){
    let gr = s;
    console.log(gr);
    return gr;
  }

  // new user observable
  newUserJoined(){
    let observable = new Observable<{user: String, message:String}>(observer=>{
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect}
    });
    return observable;
  }

  //leave group, needs group id and user
  leaveGroup(data){
    this.socket.emit('leave', data);
  }

  //broadcast when user leaves
  userLeftRoom(){
    let observable = new Observable<{user: String, message: String}>(observer=>{
    this.socket.on('left room', (data)=>{
      observer.next(data);
    });
    return () => {this.socket.disconnect();}
  });
  return observable;
  }

  //send message to socket
  sendMessage(data){
    this.socket.emit('message', data);
  }

  //recieve message from socket
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
