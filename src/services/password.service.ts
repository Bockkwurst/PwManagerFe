import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  getData(UserId: string | null): Observable<any> {
    return this.http.get(`http://localhost:5087/api/passwords/overview/${UserId}`);
  }

  searchPasswords(service: string): Observable<any> {
    return this.http.get(`http://localhost:5087/api/passwords/search/${service}`);
  }
}
