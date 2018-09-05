import { Component, OnInit } from '@angular/core';
import { Group } from '../classes/group';
import { GroupService } from '../services/group.service';
import { SocketService } from '../services/socket.service';
import { ComponentFactoryBoundToModule } from '@angular/core/src/linker/component_factory_resolver';
import * as $ from 'jquery';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public myGroup: Group;
  constructor(private groupService: GroupService, private sockServer: SocketService) { }

  ngOnInit() {
    this.retrieveGroups();
    let n = this.groupService.getGroups();
    console.log(n);
  }

 

  retrieveGroups() {
    console.log('retrieving...')
    this.groupService.getGroups();
    console.log(this.groupService.getGroups());
  }

  clickedGroup(groupID){
    let f = this.groupService.getGroups();
    console.log(f);
    let gName = f[groupID];
    console.log(gName.name);
    this.joinGroup(gName.name);
  }

  joinGroup(groupName) {
    console.log("you have joined..." + groupName);
    this.sockServer.connectRoom(groupName);
  }

}
