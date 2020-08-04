import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.scss']
})
export class FoodCatalogueComponent implements OnInit {
  categories$: Observable<any>;
  subCategories$: Observable<any>;
  products$: Observable<any>;
  isAuthenticated$: Observable<boolean>;

  constructor(private productService: ProductService, private cartService: CartService, private usersService: UsersService) {
    this.isAuthenticated$ = usersService.isAuthenticated();
  }

  ngOnInit(): void {
    this.categories$ = this.productService.getCategories();
    this.cartService.orderWeekday.subscribe(p => {
      if(this.products$)
        this.products$ = null;
    });
  }

  getSubCategories(categoryId: number) {
    this.subCategories$ = null;
    this.products$ = null;
    this.subCategories$ = this.productService.getSubCategories(categoryId);
  }

  getProducts(page, subCategoryId = null) {
    this.products$ = null;
    this.products$ = this.productService.getProductsByDate(page, subCategoryId, this.cartService.orderWeekday.value);
  }

  addProduct(product: any, quantite: number) {
    this.cartService.addProduct(product, quantite).subscribe(user => {
      console.log("Product successfully added");
    }, error => {
      alert(error);
      console.error("error", error);
    });
  }

  removeProduct(id: number) {
    this.cartService.removeProduct(id).subscribe(user => {
      console.log("Product successfully removed");
    }, error => {
      alert(error);
      console.error("error", error);
    });
  }

  getProductQuantities(id: number) {
    return this.cartService.getProduct(id);
  }

}
