import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input()
  private user: User;

  constructor(private userService: UserService) { 
  }

private removeUser(): void {
  this.userService.removeUsers(this.user.id);
}

  ngOnInit() {
  }

}
