import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any;
  public user: Subject<any> = new Subject();

  constructor(private _httpClient : HttpClient) {
    const localUsers = JSON.parse(localStorage.getItem("users"));
    if(localUsers && localUsers.length) {
      console.log("Users restored from local storage", localUsers);
      this.users = localUsers;
    } else {
      this.getUsers().subscribe(users => {
        console.log("Users parsed", users);
        this.users = localUsers;
      });
    }
  }

  getUsers() {
    return this._httpClient.get("../../assets/users.json").pipe(
      map((userList: any[]) => userList.reduce(function(map, user) {
          map[user.email] = user;
          return map;
      }, {}))
    );
  }

  checkUserExists(email: string, password: string) {
    let userToMatch = this.users[email];
    if(userToMatch) {
      return userToMatch; //userToMatch.password == password ? userToMatch : false;
    }
    else
      return false;
  }

  login(email: string, password: string) {
    const userExists = this.checkUserExists(email, password);
    if(userExists) { 
      this.user.next(userExists)
      localStorage.setItem("isConnected", "true");
      return true;
    }
  }

  logout() {
    this.user.next(null);
    localStorage.setItem("isConnected", "false");
  }

}