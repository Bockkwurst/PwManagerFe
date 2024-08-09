import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Password} from "../models/password";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordsUrl: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
    this.passwordsUrl = 'http://localhost:5087/api/passwords';
  }

  getData(UserId: string | null): Observable<any> {
    return this.http.get(`http://localhost:5087/api/passwords/overview/${UserId}`);
  }

  searchPasswords(service: string): Observable<any> {
    return this.http.get(`http://localhost:5087/api/passwords/search/${service}`);
  }


  addPasswords(password: Password, headers: any){
    return this.http.post<Password>(this.passwordsUrl, password, {headers});
  }
}
