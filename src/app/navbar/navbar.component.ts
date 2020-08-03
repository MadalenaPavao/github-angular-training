import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _usersService : UsersService, private _router : Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._usersService.logout();
    this._router.navigate(['/welcome']);
  }

}
