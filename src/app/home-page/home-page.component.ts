import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { AcceuilService } from '../acceuil.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  meilleursVentes: Array<any> = [];
  actualites: Array<any> = [];

  constructor(private _productService : ProductService, private _carrousselService: AcceuilService) { }

  ngOnInit(): void {
    this._productService.getBestSellerProducts().subscribe(products => {
      this.meilleursVentes = products;
    })
    this._carrousselService.getAcceuils().subscribe(results => {
      this.actualites = results;
    })
  }

  createProductRating(n : number) {
    return new Array(n);
  }

}
