import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AcceuilService {
  constructor(private httpClient: HttpClient) {}

  getAcceuils(page = 1): Observable<any> {
    return this.httpClient.get<any>("../../assets/actualities.json");
  }

}
