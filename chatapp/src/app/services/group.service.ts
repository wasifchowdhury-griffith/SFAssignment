import { Injectable } from '@angular/core';
import { Group } from '../classes/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public groups: Group[];
  public nextId: number;

  constructor() { }

  //get groups function
  public getGroups(): Group[] {
    let localStorageItem = JSON.parse(localStorage.getItem('groups'));
    return localStorageItem == null ? [] : localStorageItem.groups;
  }

  //get group name by id
  public getChatByID(id: number){
    let localStorageItem = JSON.parse(localStorage.getItem('groups'));
    let gName = localStorageItem.groups[id].name;
    return gName;
  }

  //function to create a new group, requires id, name
  public createGroup(id, name): void{
    let nGroup = new Group(id, name);
    console.log(nGroup);
    let groups = this.getGroups();
    groups.push(nGroup);
    console.log("Groups: " + groups);
    this.setLocalStorageGroups(groups);
    this.nextId++;
  }

  //function to delete group, requires id
  public deleteGroup(id: number) {
    let groups = this.getGroups();
    groups = groups.filter((groups) => groups.id != id);
    this.setLocalStorageGroups(groups);
    console.log("group has been removed");
  }

  //sets local storage of groups
  private setLocalStorageGroups(groups: Group[]): void {
    localStorage.setItem('groups', JSON.stringify({ groups: groups}));
  }
}

