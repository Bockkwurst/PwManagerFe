import {Component} from '@angular/core';
import {DefaultButtonComponent} from "../default-button/default-button.component";
import {AuthService} from '../../services/Auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user";
import { TokenService } from "../../services/token.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultButtonComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  UserName: string = '';
  Password: string = '';
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.user = new User();
  }

  login(): void {
    console.log('login attempr with username:', this.user.UserName);
    this.authService.login(this.user.UserName, this.user.Password).subscribe({
      next: (response) => {
        console.log('login successful, response:', response)
        this.router.navigate(['/dashboard']);
        alert('Login successful!')
      },
      error: (error) => {
        console.error('login failed, error', error);
        alert('Login failed');
      }
    });
  }
}
