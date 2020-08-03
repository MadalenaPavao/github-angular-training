import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.scss']
})
export class FoodCatalogueComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   
  }

  public getCategories() {
    return this.productService.getCategories();
  }

  getSubCategories(categoryId: number) {
    return this.productService.getSubCategories(categoryId);
  }

  getProducts(page, subCategoryId = null) {
    return this.productService.getProducts(page, subCategoryId);
  }

}
