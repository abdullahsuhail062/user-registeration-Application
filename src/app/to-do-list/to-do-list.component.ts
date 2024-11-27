import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
 import{MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatToolbarModule, MatDialogContent,MatDialogActions],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

  constructor(private dialog: MatDialog){}

  openDialog(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef,{position:{top:'4%', left: '8%'},height: '200px'})
  }

}
