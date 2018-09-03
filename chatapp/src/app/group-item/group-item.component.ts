import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../classes/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  @Input()
  private group: Group;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

}
