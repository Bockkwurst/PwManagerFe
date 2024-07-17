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
    console.log('Sending to Backend:', {username: UserName, password: Password});
    return this.http.post<any>(this.loginUrl, {username: UserName, password: Password}, {headers})
      .pipe(
        map(response => {
          console.log('Response from backend:', response);
          if (response && response.token && response.role) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
          }
          return response;
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
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


