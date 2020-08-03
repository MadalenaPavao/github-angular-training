import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  userCart : any;

  constructor(private _cartService : CartService) { }

  ngOnInit(): void {
    this._cartService.getAllProducts().subscribe(result => {
      this.userCart = result;
      console.log('USER CART', this.userCart);
    });
  }

}
