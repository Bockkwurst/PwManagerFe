import { Component } from '@angular/core';
import {User} from "../../models/user";
import {RegisterService} from "../../services/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DefaultButtonComponent} from "../default-button/default-button.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    DefaultButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService) {
    this.user = new User();
  }

  onSubmitReg(){
    this.registerService.save(this.user).subscribe(result =>
      this.router.navigate(['/home']));
  }
}
