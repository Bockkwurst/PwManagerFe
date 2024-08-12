import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordService} from "../../services/password.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tableData: any;
  searchTerm: string = '';

  constructor(private passwordService: PasswordService, private router: Router) {
  }

  getCurrentUserId():string | null {
    return localStorage.getItem('UserId');
  }

  ngOnInit(): void {
    this.loadPasswordData();
  }

  loadPasswordData(): void {
    const userId = this.getCurrentUserId();
    if (!userId) {
      console.error('UserId not found');
      return;
    }

    this.passwordService.getData(userId).subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error fetching password data', error);
      }
    });
  }

  search(): void {
    const userId = this.getCurrentUserId();
    if (!userId) {
      console.error('UserId not found');
      return;
    }

    this.passwordService.searchPasswords(this.searchTerm).subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error fetching password data', error);
      }
    });
  }

  navigateToDetail(Id: string): void{
    this.router.navigate(['/details', Id]);
  }
}
