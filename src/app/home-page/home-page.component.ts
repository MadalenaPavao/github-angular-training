import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  meilleursVentes: Array<any> = [];

  constructor(private _productService : ProductService) { }

  ngOnInit(): void {
    this._productService.getBestSellerProducts().subscribe(products => {
      this.meilleursVentes = products;
      console.log(this.meilleursVentes);
    })
  }
  
  createProductRating(n : number) {
    return new Array(n);
  }

}
