import {Component} from '@angular/core';
import {DefaultButtonComponent} from "../default-button/default-button.component";
import {AuthService} from '../../services/Auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user";


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
    const { UserName, Password } = this.user;

    this.authService.login(UserName, Password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
