import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<any>("../../assets/repas.json");
  }

  getSubCategories(categoryId: number) {
    return this.httpClient.get<any>("../../assets/famille-repas.json").pipe(
      map(products => products.filter(subCategory => subCategory.repas == categoryId))
    );
  }

  getProducts(page = 1, subCategoryId = null): Observable<any> {
    return this.httpClient.get<any>("../../assets/products.json").pipe(
      map(response => ({
        count: response.count,
        data: response.data.filter(p => subCategoryId ? p.familleId === subCategoryId : true).slice((page - 1) * 10, 10)
      }))
    );
  }

  getProductById(id: number) {
    return this.getProducts().pipe(
      map(products => products.data.find(prod => prod.productId == id))
    );
  }

  getBestSellerProducts() {
    return this.getProducts().pipe(
      map(products => products.data.map(prod => prod.sort(this.compareByRating).slice(0, 3)))
    );
  }

  compareByRating(a, b) {
    if (a.note < b.note) {
      return -1;
    }
    if (a.note > b.note) {
      return 1;
    }
    return 0;
  }
}
