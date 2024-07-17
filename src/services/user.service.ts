import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:5087/api/user';
  }

  public findAll(){
    return this.http.get<User[]>(this.usersUrl);
  }


}
