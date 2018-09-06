import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }
  
  //connect to group
  connectRoom(groupName){
    console.log(groupName);
    this.socket.emit("groupFixer", groupName);
    this.socket.on('connect', function(){
      this.socket.emit('room', groupName);
    });
  }

  //send message
  sendMessage(message){
    console.log('sendMessage()');
    this.socket.emit('add-message', message);
  }

  //get messages
  getMessages(){
    console.log('getMessages()');
    this.socket = io(this.url);

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })
      return()=>{
        this.socket.disconnect();
      }
    });

    return observable;
  }
}
