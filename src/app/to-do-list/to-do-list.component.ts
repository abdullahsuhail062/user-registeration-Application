import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject, OnInit, TemplateRef } from '@angular/core';
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
import { Route } from '@angular/router';
import { Router, RouterLink } from '@angular/router';

 
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [NgIf,MatToolbarModule, MatDialogContent,FormsModule,NgClass,NgFor,MatListItem,MatList,],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit{
isDisabled: boolean = true 
isEditing: boolean = false
title:any
task:boolean =false
description:any
taskTitleInput: string = ''
taskDescriptionInput: string = ''
isDeactive: boolean = true
isActive: boolean = false
items: { title: string; description: string, isEditing: boolean }[] =[]
dialogRef: any
listItem:any
taskId: any
isLoading: boolean =true
isTaskExist: boolean= false
  constructor(private router: Router,private authService: AuthService,private dialog: MatDialog, private apiService: ApiServiceService ){}
 ngOnInit(): void {
  const token =this.authService.getToken()
    this.apiService.getTasks(token).subscribe({next:(tasks)=>{ if (Array.isArray(tasks)) {
      this.items = tasks;
      this.isTaskExistStatus();
      this.isLoadingStatus()
    } else {
      this.items = [tasks];
      // Wrap the single task object in an array
    }

    },error:(
      error)=>{this.handleTaskFetchingError(error)}})
  
 }

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
    const token = this.authService.getToken()
    this.apiService.addTask(this.taskTitleInput,this.taskDescriptionInput,token).subscribe({next: (item)=>{console.log(item);
      
      
    
      this.items.push({title: item.title, description: item.description, isEditing: false});this.isTaskExistStatus(); 
      //this.items.unshift(item)
      localStorage.setItem('taskId',item.id);
      console.log(item.id);
      
      
    },error: (error)=>{this.handleError(error);
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

     deleteItem(dialogRef:TemplateRef<any>){
     const dialogReferrence = this.dialog.open(dialogRef,{position:{top:'10%', left: '50%'},height: '250px'})
      

    }
     

     saveItem(index: number,title: any, description:any){
      this.items[index].isEditing = false;
      const taskId =this.authService.getTaskId()
      this.apiService.saveTask(title,description,taskId
      ).subscribe({next:(update)=>{console.log(update);
      },error:(error)=>{this.handleError(error)}})

     }

     cancelEdit(index: number){
      this.items[index].isEditing = false;


     }
     onTaskChange(task:any){
      this.task = task
      const taskCompleleted =true
      const taskId = this.authService.getTaskId()
      this.apiService.taskCompeletion(taskCompleleted,taskId).subscribe({next:(data)=>{console.log(data);
      },error:(error)=>{this.handleError(error)}})
     }

     handleError(error:any){
      if(error.status ===400 && error.error.error == 'Title already exists. Choose a different one'){
        alert('Title already exists. Choose a different one')
        console.log(error.error.error);
        
      }
      if (error.statu===404) {
        console.log(error);
        
        
      }else{console.log(error);
      }
     }
     handleTaskFetchingError(error:any){
      console.log(error);
      
     }
     isLoadingStatus(){
      if (this.isLoading===true) {
        this.isLoading=false
        
      }
     }
     isTaskExistStatus() {
      if (this.items.length === 0) { 
        this.isTaskExist = true;
      } else {
        this.isTaskExist = false;
      }
    }
    

     navigateToHome(){
      this.router.navigate(['/dashboard'])
      
     }
     deleteAccount(index: number, title: string, dialogRef: TemplateRef<any>): void {
      const taskId = this.authService.getTaskId();
      
      // Close the dialog immediately
      this.dialog.closeAll();
      
      // Proceed with the delete task request
      this.apiService.deleteTask(taskId).subscribe({
        next: (task) => {
          this.items.splice(index, 1);
          this.isTaskExistStatus();
          console.log(taskId);
        },
        error: (error) => {this.handleError(error)},
      });
    }

    cancelDeletion(dialogRef: TemplateRef<any>){
      this.dialog.closeAll()
    }
    
}



