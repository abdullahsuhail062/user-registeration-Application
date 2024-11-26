import { Component } from '@angular/core';
 import{MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

}
