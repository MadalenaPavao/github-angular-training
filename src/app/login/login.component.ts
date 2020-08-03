import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Reactive forms
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private _usersService : UsersService) { }

  ngOnInit(): void {
  }

  login() { 
    let isAutenticated = this._usersService.login(this.loginForm.value.email, this.loginForm.value.password);
    if(!isAutenticated)
      alert("Authentication failed");
  }

}