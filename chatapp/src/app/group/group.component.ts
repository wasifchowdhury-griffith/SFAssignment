import { Component, OnInit } from '@angular/core';
import { Group } from '../classes/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public myGroup: Group;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  retrieveGroups() {
    console.log('retrieving...')
    this.groupService.getGroups();
    console.log(this.groupService.getGroups());
  }

}
