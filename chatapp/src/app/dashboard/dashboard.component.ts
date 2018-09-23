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

  constructor(private router: Router, 
    private groupService: GroupService
  ) { }


  ngOnInit() {
    if (sessionStorage.getItem('user') === null){
      this.router.navigate(['/login']);
    } else {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.user = user;
      console.log(this.user);
      this.groups = user.groups;
      if (this.groups.length > 0){
        this.openGroup(this.groups[0].name);
        if (this.groups[0].channels > 0){
          this.channelChangedHandler(this.groups[0].channels[0].name);
        }
      }
    }
  }

  createGroup(event){
    event.preventDefault();
    let data = {'newGroupName' : this.newGroupName};
    this.groupService.createGroup(data).subscribe(
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
    let data = {
      'username' : JSON.parse(sessionStorage.getItem('user')).username
    }
    this.groupService.getGroups(data).subscribe(
      d => {
        console.log('getGroups()');
        console.log(d);
        this.groups = d['groups'];
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
    for (let i=0; i<this.groups.length; i++){
      if(this.groups[i].name == name){
        this.selectedGroup = this.groups[i];
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
