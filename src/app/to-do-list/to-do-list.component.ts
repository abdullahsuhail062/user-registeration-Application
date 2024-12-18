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
taskTitleInput: string = ''
taskDescriptionInput: string = ''
isDeactive: boolean = true
isActive: boolean = false
items: string[] =[]
dialogRef: any
  constructor(private dialog: MatDialog, private apiService: ApiServiceService ){}

  openDialog(templateRef: TemplateRef<any>): void{
     this.dialogRef = this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '200px'})
  }

  createTaskTittle(taskTitleInput:any,taskDescriptionInput:any){
    this.taskTitleInput =taskTitleInput
    this.taskTitleInput =taskDescriptionInput
    if (taskTitleInput.trim().length>0 &&taskDescriptionInput.trim().length>0 ) {
      this.isDisabled = false
      this.isActive = true

  }else {this.isDeactive =true
        this.isActive = false
  }
    
  }

  createTaskDescription(taskDescriptionInput:any,taskTitleInput:any){
    this.taskDescriptionInput =taskDescriptionInput
    this.taskTitleInput =taskTitleInput
    if (taskDescriptionInput.trim().length>0 && taskTitleInput.trim().length>0) {
      this.isDisabled = false
      this.isActive = true

  }else {this.isDeactive =true
        this.isActive = false
  }
  }

  onCreateList(){
    this.apiService.addTask(this.taskTitleInput).subscribe({next: (response)=>{this.items.push(response.tittle +/\n/+  this.getDateTime());
    },error: (error)=>{console.log(error);
    }})
     this.dialogRef.close()
     this.taskTitleInput = ''

     }

    //  onCreateTaskDescription(){
    //   this.apiService.addTask(this.taskDescriptionInput).subscribe({next: (response)=>{this.items.push(response.description +/\n/+  this.getDateTime());
    //   },error: (error)=>{console.log(error);
    //   }})
    //    this.dialogRef.close()
    //    this.taskDescriptionInput = ''
  
    //    }

     getDateTime(): string{
      const date = new Date()
     const getDate = date.toLocaleDateString()
     return getDate
     
     }


}
