import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(page = 1): Observable<any> {
    return this.httpClient.get<any>( "../../assets/products.json").pipe(
      map(response => ({
        count: response.count,
        data: response.data.slice((page - 1) * 10, 10)
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

    );
  }
}
