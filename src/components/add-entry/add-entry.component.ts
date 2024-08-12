import {Component} from '@angular/core';
import {DefaultButtonComponent} from "../default-button/default-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {Password} from "../../models/password";
import {PasswordService} from "../../services/password.service";
import {AuthService} from "../../services/Auth.service";

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
    private authService: AuthService) {
    this.user = new User();
    this.passwords = new Password();
  }

  onSubmitAdd() {
    const token = this.authService.getAuthToken();
    const userId = this.authService.getUserId();
    console.log('Token:', token);
    console.log('User ID:', userId);
    if (token && userId) {
      const headers = { 'Authorization': `Bearer ${token}`};
      const body = { ...this.passwords, userId };
      this.passwordService.addPasswords(body, headers).subscribe({
        next: (response) => {
          console.log('Password added successfully', response);
          this.router.navigate(['/passwords']);
        },
        error: (error) => {
          alert('Error adding password');
          console.log('Error adding password:', error);
        }
      });
    } else {
      console.log('Authentication token or user id is missing');
      //this.router.navigate(['/login']);
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
