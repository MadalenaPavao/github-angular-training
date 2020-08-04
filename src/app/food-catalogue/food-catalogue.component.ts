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

}
