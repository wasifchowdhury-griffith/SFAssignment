import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';

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
  public newGroupName:String;
  public cUser:String;
  public myGroups = [];

  constructor(private router: Router, 
    private groupService: GroupService
  ) { }


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

  createGroup(event){
    event.preventDefault();
    let nGroup = {
      name: this.newGroupName,
      admins: {name: "super"}
    }
    this.groupService.createGroup(nGroup).subscribe(
      data => {
        console.log(data);
        this.getGroups();
      },
      error => {
        console.error(error);
      }
    )
  }

  deleteGroup(groupName){
    this.groupService.deleteGroup(groupName, this.user.username).subscribe(
      data => {
        this.getGroups();
      }, error => {
        console.error(error);
      }
    )
  }

  getGroups(){
    this.groupService.getGroups(this.cUser).subscribe(
      d => {
        console.log('getGroups()');
        console.log(d);
        this.groups = d['groups'];
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

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  openGroup(name){
    console.log(name);
    for (let i=0; i<this.myGroups.length; i++){
      if(this.myGroups[i].name == name){
        this.selectedGroup = this.myGroups[i];
      }
    }
    this.channels = this.selectedGroup.channels;
  }

  channelChangedHandler(name){
    let found:boolean = false;
    for (let i=0; i<this.channels.length; i++){
      if(this.channels[i].name == name){
        this.selectedChannel = this.channels[i];
        found = true;
      }
    }
    return found;
  }

  getChannels(groupName){
    let channels = [];
    return channels;
  }

}
