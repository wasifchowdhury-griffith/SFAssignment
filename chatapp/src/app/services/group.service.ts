import { Injectable } from '@angular/core';
import { Group } from '../classes/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public groups: Group[];
  private nextId: number;

  constructor() { }

  public getGroups(): Group[] {
    let localStorageItem = JSON.parse(localStorage.getItem('groups'));
    return localStorageItem == null ? [] : localStorageItem.groups;
  }

  public createGroup(id, name): void{

    let nGroup = new Group(id, name);
    console.log(nGroup);
    let groups = this.getGroups();
    groups.push(nGroup);
    console.log("Groups: " + groups);
    this.setLocalStorageGroups(groups);
    this.nextId++;
  }

  public addToGroup(){
    
  }

  private setLocalStorageGroups(groups: Group[]): void {
    localStorage.setItem('groups', JSON.stringify({ groups: groups}));
  }
}

