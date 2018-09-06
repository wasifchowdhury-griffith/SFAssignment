import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nchat',
  templateUrl: './nchat.component.html',
  styleUrls: ['./nchat.component.css'],
  providers: [ChatService],
})
export class NchatComponent implements OnInit {
  chat = {};
  chatName;
  user: String;
  group: String;
  messageText: String;
  messageArray:Array<{user: String, message: String}> = [];

  constructor(private route: ActivatedRoute, private groupService: GroupService,
  private chatService: ChatService,
  private userService: UserService) {
    this.chatService.newUserJoined()
    .subscribe(data=>this.messageArray.push(data));

    this.chatService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));
   }

   //retrieves group id, sets group name
  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    let f = this.getChatByID(id);
    this.chatName = f;
    this.user = this.getUser();
    this.chatService.joinGroup({user: this.user, group: this.chatName})
  }
  
  //function to leave group
  leave(){
    this.chatService.leaveGroup({user: this.user, group: this.chatName});
    history.back();
  }

  //function to delete group
  delete(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.groupService.deleteGroup(id);
    history.back();
  }

  //function to fetch user
  getUser(){
    this.user = this.userService.getCurrentUser();
    return this.user;
  }

  //function to get group by id
  getChatByID(id: number){
    return this.groupService.getChatByID(id);
  }

  //function to send message
  sendMessage(){
    console.log(this.user);
    let s = +this.route.snapshot.paramMap.get('id');
    let g = this.getChatByID(s);
    console.log(g);
    this.chatService.sendMessage({user: this.user, group: g, message:this.messageText});
  }

}
