import { NgClass } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
 import{MatToolbarModule} from '@angular/material/toolbar'
 import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatToolbarModule, MatDialogContent,FormsModule,NgClass,],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
isDisabled: boolean = true 
input: string = ''
isDeactive: boolean = true
isActive: boolean = false

  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any ){}

  openDialog(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '200px', data:{input: this.input, onCreateList: ()=> this.createList()}})
  }

  createList(){
    if (this.data.input.length>0) {
      this.isDisabled = false
      this.toggleBtnColor()
      

      
    }
  }

  toggleBtnColor(){
    if (this.data.input.length>0) {
      this.isActive = true
      
    }else {this.isDeactive = false}


  }

}
