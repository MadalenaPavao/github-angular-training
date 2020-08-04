import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<any>;
  
  constructor(private _usersService : UsersService, private _router : Router) {
    this.isAuthenticated$ = _usersService.isAuthenticated();
    this.user$ = _usersService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this._usersService.logout();
    this._router.navigate(['/welcome']);
  }

}
