import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, of, pipe} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = 'http://localhost:5087/api/user/login';

  constructor(private http: HttpClient) {
  }

  login(UserName: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.loginUrl, {username: UserName, password: Password}, {headers})
      .pipe(
        map(response => {
          if (response && response.token && response.role) {
            this.setToken(response.token);
            localStorage.setItem('role', response.role);
          }
          return response;
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): void {
    this.deleteToken();
    localStorage.removeItem('token');
  }

  private setToken(token:string): void {
    document.cookie = `token=${token}; path=/;`;
  }

  private deleteToken(): void {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1979 00:00:00 GMT';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getAuthToken(): string | null {
    return document.cookie.getToken('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthehticated(): boolean {
    return !!this.getAuthToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
}


