import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CartService } from '../cart.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<any>;
  datePickerConfig: any = {};
  selectedDate: any;
  orderDay: number;
  
  constructor(private _usersService : UsersService, private _router : Router, private _cartService : CartService) {
    this.isAuthenticated$ = _usersService.isAuthenticated();
    this.user$ = _usersService.user;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user.commandeList.length) {
        this.selectedDate = moment(user.commandeList[0].datecommande);
      }
    })
  }


  logout() {
    this._usersService.logout();
    this._router.navigate(['/welcome']);
  }

  dateChange() {
    alert("Your order will be deleted on date change");
    this.orderDay = this.selectedDate.day();
    this._cartService.orderWeekday.next(this.orderDay || 7); // TODO: create method to handle sunday
    this.user$.subscribe(user => {
      if(!user.commandeList.length) {
        this._cartService.createOrder({date : this.selectedDate.format("YYYY-MM-DD")}).subscribe(result =>
          {console.log('order created');}
          );
      }
    })
    this._cartService.removeAllProduct().subscribe(p => console.log('Emptied cart'));
 
  }

}
