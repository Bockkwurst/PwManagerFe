import { Component } from '@angular/core';
import {DefaultButtonComponent} from "../default-button/default-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

}
