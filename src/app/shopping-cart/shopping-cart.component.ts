import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  userCart : any;
  userCartColumns = ['Produit', 'Quantité', 'Prix'];
  totalPrice: number = null;

  constructor(private _cartService : CartService) { }

  ngOnInit(): void {
    this._cartService.getAllProducts().subscribe(result => {
      this.userCart = result;
      console.log('USER CART', this.userCart);
    });
    this.totalPrice = this.userCart.reduce(function(accumulator, currentItem) {
      return accumulator + (currentItem.prix_unitaire * currentItem.quantite);
    }, 0);
  }

  clearCart() {
    this._cartService.removeAllProduct().subscribe(result => {
      this.userCart = [];
      this.totalPrice = 0;
    });
  }
}
