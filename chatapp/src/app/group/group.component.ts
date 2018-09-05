import { Component, OnInit } from '@angular/core';
import { Group } from '../classes/group';
import { GroupService } from '../services/group.service';
import { SocketService } from '../services/socket.service';
import { ChatService } from '../services/chat.service';
import * as $ from 'jquery';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public myGroup: Group;
  user: String;
  group: String;
  public indexx: number;
  constructor(private groupService: GroupService, 
    private sockServer: SocketService, 
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.retrieveGroups();
    let n = this.groupService.getGroups();
  }
  
  join(i) {
    let f = this.groupService.getGroups();
    let gName = f[i].name
    let user = this.userService.getCurrentUser();
    this.chatService.joinGroup({user:user, group:gName});
    this.setIndex(i);
    console.log("you are joining: " + gName);
  }

  leave(i){
    let f = this.groupService.getGroups();
    let gName = f[i].name;
    this.chatService.leaveGroup({user:this.user, group: gName});
  }

  setIndex(index){
    return this.indexx = index;
  }
 

  retrieveGroups() {
    console.log('retrieving...')
    this.groupService.getGroups();
    console.log(this.groupService.getGroups());
  }

  clickedGroup(groupID){
    let f = this.groupService.getGroups();
    let gName = f[groupID];
    this.joinGroup(gName.name);
  }

  joinGroup(groupName) {
    console.log("you have joined..." + groupName);
    this.sockServer.connectRoom(groupName); 
  }

}