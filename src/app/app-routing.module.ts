import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCatalogueComponent } from './food-catalogue/food-catalogue.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path : 'catalogue', component : FoodCatalogueComponent },
  { path : 'login', component : LoginComponent },
  { path : 'cart', component : ShoppingCartComponent },
  { path : 'welcome', component : HomePageComponent},
  { path : '', redirectTo : 'welcome', pathMatch : 'full'},
  { path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
