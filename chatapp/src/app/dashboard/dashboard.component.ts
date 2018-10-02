import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public user;
  public selectedGroup;
  public selectedChannel;
  public groups = [];
  public channels =[];
  public myChannels =[];
  public newGroupName:String;
  public cUser:String;
  public myGroups = [];

  constructor(private router: Router, 
    private groupService: GroupService,
    private channelService: ChannelService
  ) { }

  //if user isn't logged in redirects to /login, if logged in fetches groups
  ngOnInit() {
    if (sessionStorage.getItem('user') === null){
      this.router.navigate(['/login']);
    } else {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.user = user[0];
      this.cUser = this.user.username;
      this.getGroups();
      console.log(this.user.permissions);
    }
  }

  //function to create new group
  createGroup(event){
    event.preventDefault();
    let nGroup = {
      name: this.newGroupName,
      admins: {name: "super"},
      members: {name: "wasif"}
    }
    console.log('creating new group: ' + this.newGroupName);
    this.groupService.createGroup(nGroup).subscribe(
      data => {
        console.log(data);
        this.getGroups();
      },
      error => {
        console.error(error);
      }
    )
    this.getGroups();
  }

  //function to delete specified group
  deleteGroup(groupName){
    this.groupService.deleteGroup(groupName).subscribe(
      data => {
        this.getGroups();
      }, error => {
        console.error(error);
      }
    )
    console.log('deleted group: ' + groupName);
    this.getGroups();
  }

  //get groups the user is in
  getGroups(){
    this.groupService.getGroups(this.cUser).subscribe(
      d => {
        console.log('getGroups()');
        console.log(d);
        this.myGroups.push(d);
        this.myGroups = this.myGroups[0];
        console.log(this.myGroups);
        this.myGroups = this.groupService.sortGroups(this.myGroups, this.cUser);
        console.log(this.myGroups);
      },
      error => {
        console.error(error);
      }
    )
  }

  //logs the user out, clearing the session
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  //opens specified group and fetches channels
  openGroup(name){
    for (let i=0; i<this.myGroups.length; i++){
      if(this.myGroups[i].name == name){
        this.selectedGroup = this.myGroups[i];
        this.getChannels(this.selectedGroup.name)
      }
    }
    this.groupService.setCurrentGroup(this.selectedGroup.name);
  }

  //get channels function
  getChannels(name){
    this.channelService.getChannels(name).subscribe(
      d => {
        console.log('getChannels()');
        this.myChannels.push(d);
        this.myChannels = this.myChannels;
        this.myChannels = this.sortChannels(this.myChannels[0], this.selectedGroup.name);
      },
      error => {
        console.error(error);
      }
    )
  }

  //sorts channels that belongs to specified group
  sortChannels(channels, groupN){
    let channelArray = [];
    for (let i=0; i<channels.length;i++){
      if (channels[i].group == groupN){
        channelArray.push(channels[i]);
      }
    }
    return channelArray;
  }

  //handler to detect when user selects another channel
  channelChangedHandler(name){
    console.log(name);
    let found:boolean = false;
    for (let i=0; i<this.myChannels.length; i++){
      if(this.myChannels[i].name == name){
        this.selectedChannel = this.myChannels[i];
        found = true;
        console.log(this.selectedChannel);
      }
    }
    return found;
  }
}
