import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { ChatService } from '../services/chat.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit {
  user: string;
  id: number;
  messages=[];
  message;
  currentUser: string;
  messageText: string;
  connection;
  group: String;
  public indexx: number;
  messagesArray:Array<{user: String, message:String}> = [];

  constructor(private sockServer: SocketService, 
    private router:Router, 
    private userService: UserService,
    private groupService: GroupService,
    private chatService: ChatService,
   ) { 
     this.chatService.newUserJoined()
     .subscribe(data=> this.messagesArray.push(data));

     this.chatService.userLeftRoom()
     .subscribe(data=>this.messagesArray.push(data));

     this.chatService.newMessageReceived()
     .subscribe(data=>this.messagesArray.push(data));
   }

  ngOnInit() {
    if (!localStorage.getItem('users')){
      console.log('not validated');
      localStorage.clear();
      alert("Not a valid user");
      this.router.navigateByUrl('login');
    } else {
      this.user = this.userService.getCurrentUser();
      this.id = this.userService.getUserId();
      console.log("session started for: " + this.user);
      console.log("id is: " + this.id);
    }
    console.log(this.userService.getCurrentUser());
    this.connection = this.sockServer.getMessages().subscribe(message=>{
      this.messages.push(message);
      this.message = "";
    });
  }

  join(i) {
    let f = this.groupService.getGroups();
    let gName = f[i].name
    let user = this.userService.getCurrentUser();
    this.chatService.joinGroup({user:user, group:gName});
    this.setIndex(i);
    console.log("you have joined: " + gName);
  }

  leave(i){
    let f = this.groupService.getGroups();
    let gName = f[i].name;
    this.chatService.leaveGroup({user:this.user, group: gName});
  }

  sendMessage(){
    let f = this.groupService.getGroups();
    let gName = f[this.indexx];
    console.log(this.messageText);
    this.chatService.sendMessage({user:this.user, group: gName, message:this.messageText});
  }

  messagesReceived(){
    let msgs = this.chatService.newMessageReceived();
    console.log(msgs);
  }

  setIndex(index){
    return this.indexx = index;
  }

  // sendMessage(){
  //   this.sockServer.sendMessage('[' + this.user + ']:' + this.message);
  // }

  // ngOnDestroy(){
  //   if(this.connection){
  //     this.connection.unsubscribe();
  //   }
  // }

}
