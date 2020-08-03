import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AutenticationService } from '';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Reactive forms
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(/*private _autentService : AutenticatioService*/) { }

  ngOnInit(): void {
  }

  login() { 
    // let isAutenticated = this._autentService.login(this.loginForm.value.email, this.loginForm.value.password);
    // if(!isAutenticated)
    //   alert("Authentication failed");
  }

}