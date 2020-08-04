import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private usersService : UsersService) {}

  addProduct(product: any, quantite: number, repasLibelle?: number) {
     return new Observable(observer => {
      this.getUser().subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot add product. Order doesnt exists. Please choose delivery date using the calendar icon located in the topbar");
          return
        }

        const command = updatedUser.commandeList[0];

        const productItem = {
            id: this.generateId(),
            quantite: quantite,
            repasLibelle: repasLibelle,
            produit: product
        };

        const productFound = command.ligneCommandeList.find(item => item.produit.id === product.id);
        if (productFound) {
          productFound.quantite++;
        } else {
          command.ligneCommandeList.push(productItem);
        }

        this.updatePriceTotal(command);

        this.usersService.user.next(updatedUser);
        this.usersService.persistUsers();
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot add product");
      });
    });
  }

  getUser() {
    return this.usersService.user.pipe(first());
  }

  generateId() {
    return (new Date()).getTime();
  }

  createOrder(order: {date: Date, addressShiping?: string, addressInvoice: string}) {
    return new Observable(observer => {
      this.getUser().subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        updatedUser.commandeList.push(order);
        
        this.usersService.user.next(updatedUser);
        this.usersService.persistUsers();
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot create order");
      });
    });
  }

  removeProduct(id: number) {
    return new Observable(observer => {
      this.getUser().subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot remove product. Order doesnt exists. Please choose delivery date using the calendar icon located in the topbar");
          return
        }

        const command = updatedUser.commandeList[0];

        const productFound = command.ligneCommandeList.find(p => p.id === id);
        if (productFound) {
          productFound.quantite--;
          if (productFound.quantite === 0) {
            command.ligneCommandeList.splice(command.ligneCommandeList.indexOf(productFound), 1);
          }
        } else {
          delete command.ligneCommandeList[id];
        }

        this.updatePriceTotal(command);

        this.usersService.user.next(updatedUser);
        this.usersService.persistUsers();
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot remove product");
      });
    });
  }

  removeAllProduct() {
    return new Observable(observer => { 
      this.getUser().subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot remove products. Order doesnt exists");
          return
        }

        updatedUser.commandeList = [];

        this.usersService.user.next(updatedUser);
        this.usersService.persistUsers();
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot remove products");
      });
    });
  }

  updatePriceTotal(order: any) {
     return new Observable(observer => { 
      this.getUser().subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot remove products. Order doesnt exists");
          return
        }

        order.prix_total = order.ligneCommandeList.reduce(function(accumulator, currentItem) {
          return accumulator + currentItem.prix_unitaire;
        }, 0);
        
        this.usersService.user.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot remove products");
      });
    });
  }

  getAllProducts() {
    return this.getUser().pipe(
      map(user => user.commandeList.map(commandList => commandList.ligneCommandeList))
    );
  }
}