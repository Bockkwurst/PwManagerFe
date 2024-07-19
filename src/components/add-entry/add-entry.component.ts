import {Component} from '@angular/core';
import {DefaultButtonComponent} from "../default-button/default-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {Password} from "../../models/password";
import {PasswordService} from "../../services/password.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-add-entry',
  standalone: true,
  imports: [
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-entry.component.html',
  styleUrl: './add-entry.component.css'
})
export class AddEntryComponent {

  user: User;
  passwords: Password;

  constructor(
    private router: Router,
    private passwordService: PasswordService,
    private tokenService: TokenService) {
    this.user = new User();
    this.passwords = new Password();
  }

  onSubmitAdd() {
   const token = this.tokenService.getTokenFromCookie('jwt');
   if (token) {
     const headers = { 'Authorization': `Bearer ${token}` };
     this.passwordService.addPasswords(this.passwords, headers).subscribe({
       next: (response) => {
         console.log('Password added successfully', response);
         this.router.navigate(['/passwords']);
       },
       error: () => {
         alert('Error adding password');
       }
     });
   } else {
     console.log('Authentication token is missing');
     this.router.navigate(['/login']);
   }
  }

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?[];,./\'\\';
    let password = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    this.passwords.Password = password;
  }
}
