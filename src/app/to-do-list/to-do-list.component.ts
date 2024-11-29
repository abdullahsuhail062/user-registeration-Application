import { NgClass } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
 import{MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatToolbarModule, MatDialogContent,FormsModule,NgClass],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
activateBtn: boolean = true 
input: string = ''
isDeactive: boolean = true
isActive: boolean = false

  constructor(private dialog: MatDialog){}

  openDialog(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '200px'})
  }

  createList(){
    if (this.input.length>0) {
      this.activateBtn = false

      
    }
  }

  toggleBtnColor(){
    if (this.input.length>0) {
      this.isActive = true
      
    }else {this.isDeactive = false}


  }

}
