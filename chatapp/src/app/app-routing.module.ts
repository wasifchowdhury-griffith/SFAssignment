import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'chat', component:ChatComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'documentation', component:DocumentationComponent},
  {path:'create-group', component:CreateGroupComponent},
  {path:'dashboard', component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
