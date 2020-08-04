import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.scss']
})
export class FoodCatalogueComponent implements OnInit {
  categories$: Observable<any>;
  subCategories$: Observable<any>;
  products$: Observable<any>;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.categories$ = this.productService.getCategories();
    this.cartService.getProduct(1).subscribe(p => console.log("p", p));
  }

  getSubCategories(categoryId: number) {
    this.subCategories$ = null;
    this.products$ = null;
    this.subCategories$ = this.productService.getSubCategories(categoryId);
  }

  getProducts(page, subCategoryId = null) {
    this.products$ = null;
    this.products$ = this.productService.getProducts(page, subCategoryId);
  }

  addProduct(product: any, quantite: number) {
    this.cartService.addProduct(product, quantite).subscribe(user => console.log("success"), error => console.error("error"));
  }

  removeProduct(id: number) {
    this.cartService.removeProduct(id).subscribe(user => console.log("success"), error => console.error("error"));
  }

  getProductQuantities(id: number) {
    return this.cartService.getProduct(id);
  }

}
