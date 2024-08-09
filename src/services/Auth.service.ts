import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, of, pipe} from "rxjs";
import {catchError} from "rxjs/operators";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = 'http://localhost:5087/api/user/login';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }

  login(UserName: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl, { username: UserName, password: Password }, { headers })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.tokenService.setTokenAsCookie('jwt', response.token, 7);
          }
          if (response && response.role) {
            this.tokenService.setTokenAsCookie('role', response.role, 7);
          }
          return response;
        }),
      );
  }

  logout(): void {
    this.tokenService.deleteTokenCookie('jwt');
    this.tokenService.deleteTokenCookie('role');
  }

  getAuthToken(): string | null {
    return this.tokenService.getTokenFromCookie('jwt');
  }

  getUserRole(): string | null {
    return this.tokenService.getTokenFromCookie('role');
  }

  isAuthehticated() {
    return this.tokenService.getTokenFromCookie('jwt');
  }
}


