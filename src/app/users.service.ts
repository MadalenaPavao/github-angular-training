import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any;
  user: Subject<any> = new Subject();

  constructor(private _httpClient : HttpClient) {
    const localUsers = JSON.parse(localStorage.getItem("users"));
    if(localUsers && localUsers.length) {
      console.log("Users restored from local storage", localUsers);
      this.users = localUsers;
    } else {
      this.getUsers().subscribe(users => {
        console.log("Users parsed", users);
        this.users = localUsers;
      });
    }
  }

  getUsers() {
    return this._httpClient.get("../../assets/users.json").pipe(
      map((userList: any[]) => userList.reduce(function(map, user) {
          map[user.email] = user;
          return map;
      }, {}))
    );
  }

  checkUserExists(email: string, password: string) {
    let userToMatch = this.users[email];
    if(userToMatch) {
      return userToMatch; //userToMatch.password == password ? userToMatch : false;
    }
    else
      return false;
  }

  login(email: string, password: string) {
    const userExists = this.checkUserExists(email, password);
    if(userExists) { 
      this.user.next(userExists)
      localStorage.setItem("isConnected", "true");
      return true;
    }
  }

  logout() {
    this.user.next(null);
    localStorage.setItem("isConnected", "false");
  }

  addProduct(product: any, quantite: number, repasLibelle?: number) {
     return new Observable(observer => {
      this.user.subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot add product. Order doesnt exists");
          return
        }

        const command = updatedUser.commandeList[0];

        const productItem = {
            id: this.generateId(),
            quantite: quantite,
            repasLibelle: repasLibelle,
            produit: product
        };

        const productFound = command.ligneCommandeList.find(p => p.id === product.id);
        if (productFound) {
          productFound.quantite++;
        } else {
          command.ligneCommandeList.push(productItem);
        }

        this.user.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot add product");
      });
    });
  }

  generateId() {
    return (new Date()).getTime();
  }

  createOrder(order: {date: Date, addressShiping?: string, addressInvoice: string}) {
    return new Observable(observer => {
      this.user.subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        updatedUser.commandeList.push(order);
        this.user.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot create order");
      });
    });
  }

  removeProduct(id: number) {
    return new Observable(observer => {
      this.user.subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot remove product. Order doesnt exists");
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


        this.user.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot remove product");
      });
    });
  }

  removeAllProduct() {
    return new Observable(observer => { 
      this.user.subscribe(user => {
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        if(!updatedUser.commandeList.length) {
          observer.error("Cannot remove products. Order doesnt exists");
          return
        }

        updatedUser.commandeList = [];

        this.user.next(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      }, error => {
        observer.error("Cannot remove products");
      });
    });
  }

}