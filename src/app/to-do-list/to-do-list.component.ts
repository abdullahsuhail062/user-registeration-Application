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
  imports: [MatToolbarModule, MatDialogContent,FormsModule,],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
isDisabled: boolean = true 
dialogInput: string = ''
isDeactive: boolean = true
isActive: boolean = false

  constructor(private dialog: MatDialog ){}

  openDialog(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '200px'})
  }

  getInput(dialogInput:any){
    if (dialogInput.trim().length>0) {
      this.isDisabled = false
      this.toggleBtnColor()
      

      
    }
    
  }

  onCreateList(dialogRef:any){
    dialogRef.cloaseAll()

  }

  toggleBtnColor(){
    if (this.dialogInput.trim().length>0) {
      this.isActive = true
      
    }else {this.isDeactive = false}


  }

}
