import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Subject<any> = new Subject();

  constructor(private _httpClient : HttpClient) {
    const localUsers = JSON.parse(localStorage.getItem("users"));
    if(localUsers && localUsers.length) {
      console.log("Users restored from local storage", localUsers);
      this.users.next(localUsers);
    } else {
      this.getUsers().subscribe(users => {
        console.log("Users parsed", users);
        this.users.next(users);
      });
    }
  }

  getUsers() {
    return this._httpClient.get("../../assets/users.json").pipe(
      map((userList: any[]) => userList.reduce(function(map, obj) {
          map[obj.id] = obj;
          return map;
      }, {}))
    );
  }

}