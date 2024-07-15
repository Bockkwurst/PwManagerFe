export class User {
  Id: string;
  UserName: string;
  FirstName?: string;
  LastName?: string;
  Email: string;
  Password: string;
  IsAdmin: boolean = false;

  constructor() {
    this.Id = '';
    this.UserName = '';
    this.Email = '';
    this.Password = '';
  }
}
