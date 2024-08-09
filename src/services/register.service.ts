import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:5087/api/user/register';
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}

