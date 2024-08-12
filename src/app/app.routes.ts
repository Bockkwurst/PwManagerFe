import { Routes } from '@angular/router';
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {ContactComponent} from "../components/contact/contact.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {AuthGuard} from "../services/AuthGuard";
import {DetailsComponent} from "../components/details/details.component";
import {LandingComponent} from "../components/landing/landing.component";
import {AccountComponent} from "../components/account/account.component";
import {AddEntryComponent} from "../components/add-entry/add-entry.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'details/:Id', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'create', component: AddEntryComponent, canActivate: [AuthGuard]},
  {path: 'account/:Id', component: AccountComponent, canActivate: [AuthGuard]},
];
