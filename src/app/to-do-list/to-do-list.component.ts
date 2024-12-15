import { NgClass, NgFor } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
 import{MatToolbarModule} from '@angular/material/toolbar'
 import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
 
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [MatToolbarModule, MatDialogContent,FormsModule,NgClass,NgFor,MatListItem,MatList],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
isDisabled: boolean = true 
dialogInput: string = ''
isDeactive: boolean = true
isActive: boolean = false
items: string[] =[]
dialogRef: any
  constructor(private dialog: MatDialog, private apiService: ApiServiceService ){}

  openDialog(templateRef: TemplateRef<any>): void{
     this.dialogRef = this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '200px'})
  }

  getInput(dialogInput:any){
    this.dialogInput =dialogInput
    if (dialogInput.trim().length>0) {
      this.isDisabled = false
      this.isActive = true

  }else {this.isDeactive =true
        this.isActive = false
  }
    
  }

  onCreateList(){
    this.apiService.addTask(this.items.push(this.dialogInput)).subscribe({next: (response)=>{this.items.push(response.description);
    },error: (error)=>{console.log(error);
    }})
     this.dialogRef.close()
     this.dialogInput = ''

     


    

  }


}
