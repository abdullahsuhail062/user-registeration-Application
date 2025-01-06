import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
 import{MatToolbarModule} from '@angular/material/toolbar'
 import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { title } from 'node:process';
import { AuthService } from '../auth.service';
import { error } from 'node:console';
 
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [NgIf,MatToolbarModule, MatDialogContent,FormsModule,NgClass,NgFor,MatListItem,MatList,],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
isDisabled: boolean = true 
isEditing: boolean = false
title:any
description:any
taskTitleInput: string = ''
taskDescriptionInput: string = ''
isDeactive: boolean = true
isActive: boolean = false
items: { title: string; description: string, isEditing: boolean }[] =[]
dialogRef: any
listItem:any
taskId: any
  constructor(private authService: AuthService,private dialog: MatDialog, private apiService: ApiServiceService ){}

  openDialog(templateRef: TemplateRef<any>): void{
     this.dialogRef = this.dialog.open(templateRef,{position:{top:'4%', left: '11%'},height: '250px'})
  }

  createTaskTittle(){
    
     if (this.taskTitleInput.trim().length>0 &&this.taskDescriptionInput.trim().length>0 ) {
      this.isDisabled = false
      this.isActive = true

  }else {this.isDeactive =true
        this.isActive = false
  }
    
  }

  createTaskDescription(){
    if (this.taskDescriptionInput.trim().length>0 && this.taskTitleInput.trim().length>0) {
      this.isDisabled = false
      this.isActive = true

  }else {this.isDeactive =true
        this.isActive = false
  }
  }

  onCreateList(){
    this.apiService.addTask(this.taskTitleInput,this.taskDescriptionInput).subscribe({next: (item)=>{
      this.items.push({title: item.title, description: item.description, isEditing: false}); localStorage.setItem('taskId',item.id);
      
    },error: (error)=>{console.log(error);
    }})
     this.dialogRef.close()
     this.taskTitleInput = ''
     this.taskDescriptionInput = ''

     }

    

     getDateTime(): string{
      const date = new Date()
     const getDate = date.toLocaleDateString()
     return getDate
     
     }

     editItem(index: number) {
      this.items[index].isEditing = true
     }

     deleteItem(index: number,title: string){
      this.items.slice(index,1)
      this.apiService.deleteTask(title).subscribe({next:(task)=>{console.log(task);
      
      
      }})

     }

     saveItem(index: number,title: any, description:any){
      this.items[index].isEditing = false;
      const updatedTaskTitle =this.authService.getTaskId()
      
      this.apiService.saveTask(title,description,updatedTaskTitle
      ).subscribe({next:(update)=>{console.log(update);
      },error:(error)=>{this.handleError(error)}})

     }

     cancelEdit(index: number){
      this.items[index].isEditing = false;


     }

     handleError(error:any){
      if (error.statu===404) {
        console.log(error);
        
        
      }else{console.log(error);
      }
     }


}
