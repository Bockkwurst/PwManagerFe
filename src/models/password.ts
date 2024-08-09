export class Password {
  Id: string;
  UserId: string;
  Service: string;
  Login: string;
  Password: string;
  Notes: string;
  IsActive: boolean = true;
  CreatedOn: Date;

  constructor() {
    this.Id = '';
    this.UserId = '';
    this.Service = '';
    this.Login = '';
    this.Password = '';
    this.Notes = '';
    this.IsActive = true;
    this.CreatedOn = new Date();
  }
}
