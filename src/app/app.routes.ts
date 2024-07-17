import { Routes } from '@angular/router';
import {LoginComponent} from "../components/login/login.component";
import {HomeComponent} from "../components/home/home.component";
import {RegisterComponent} from "../components/register/register.component";
import {ContactComponent} from "../components/contact/contact.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {AuthGuard} from "../services/AuthGuard";
import {DetailsComponent} from "../components/details/details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'details/:Id', component: DetailsComponent, canActivate: [AuthGuard]}
];
