import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Group } from '../classes/group';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string;
  userId: number;
  groups: Group;
  currentUser: string;

  constructor(private router: Router, private groupService: GroupService, private userService: UserService) { }

  ngOnInit() {
    if (!localStorage.getItem('users')){
      console.log('not validated');
      localStorage.clear();
      alert("Not a valid user");
      this.router.navigateByUrl('login');
    } else {
      this.user = this.userService.getCurrentUser();
      this.userId = this.userService.getUserId();
      console.log("session started for: " + this.user);
      console.log("id is: " + this.userId);
    }
  }

  logout(){
    console.log(this.userService.getUserId());
    this.userService.removeUsers(this.userService.getUserId());
    this.router.navigate(['/login']);
  }

}
