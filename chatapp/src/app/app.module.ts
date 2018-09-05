import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketService } from './services/socket.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserItemComponent } from './user-item/user-item.component';
import { GroupComponent } from './group/group.component';
import { BnavbarComponent } from './bnavbar/bnavbar.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NchatComponent } from './nchat/nchat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    HomeComponent,
    CreateUserComponent,
    UserItemComponent,
    GroupComponent,
    BnavbarComponent,
    DocumentationComponent,
    CreateGroupComponent,
    DashboardComponent,
    NchatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SocketService,
    UserService,
    GroupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
