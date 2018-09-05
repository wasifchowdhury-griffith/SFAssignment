import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nchat',
  templateUrl: './nchat.component.html',
  styleUrls: ['./nchat.component.css']
})
export class NchatComponent implements OnInit {
  chat = {};
  chatName;
  user;
  group;
  messageText: String;

  constructor(private route: ActivatedRoute, private groupService: GroupService,
  private chatService: ChatService,
  private userService: UserService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    let f = this.getChatByID(id);
    this.chatName = f;
    console.log(this.getUser());
  }
  
  getUser(){
    this.user = this.userService.getCurrentUser();
    return this.user;
  }

  getChatByID(id: number){
    return this.groupService.getChatByID(id);
  }

  sendMessage(){
    console.log(this.user);
    let s = +this.route.snapshot.paramMap.get('id');
    let g = this.getChatByID(s);
    console.log(g);
    this.chatService.sendMessage({user: this.user, group: g, message:this.messageText});
  }

}
