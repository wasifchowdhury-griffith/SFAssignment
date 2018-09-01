import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: string;
  messages=[];
  currentUser: string;
  message;
  connection;

  constructor(private sockServer: SocketService, private router:Router, private userService: UserService) { }

  ngOnInit() {
    if (!localStorage.getItem('users')){
      console.log('not validated');
      localStorage.clear();
      alert("Not a valid user");
      this.router.navigateByUrl('login');
    } else {
      this.user = this.userService.getCurrentUser();
      console.log("session started for: " + this.user);
    }
    console.log(this.userService.getCurrentUser());
    this.connection = this.sockServer.getMessages().subscribe(message=>{
      this.messages.push(message);
      this.message = "";
    });
  }

  sendMessage(){
    this.sockServer.sendMessage('[' + this.user + ']:' + this.message);
  }

  ngOnDestroy(){
    if(this.connection){
      this.connection.unsubscribe();
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('home');
  }


}
