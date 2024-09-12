import { Component,Injectable,NgModule } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { config } from './app.config.server';
import { response } from 'express';

import { error } from 'node:console';
import { AsyncCompleter } from 'node:readline';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatFormFieldModule,
    MatInputModule,ReactiveFormsModule,CommonModule,NgIf,NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
@Injectable({providedIn: 'root'})
export class AppComponent {
  signUpForm: FormGroup
  formErrors: any = {username: ''};
  constructor(private http: HttpClient){
    this.signUpForm = new FormGroup({username: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*')])
      ,email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@example\.(com|org|net)$/)]),password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9]*')]),confirmPassword: new FormControl('',[Validators.required ])}) 
    }


    
    


  onSubmit(): void{

    const formData = this.signUpForm.value
    this.http.post<unknown>(
      '/api/register',{username: this.signUpForm.get('username')?.value,email: this.signUpForm.get('email')?.value, password: this.signUpForm.get('password')?.value,
      formData}, 
      { responseType: 'json' }
    ).subscribe({next: (data) => {
      console.log(data);
      
      
      
    }, error: (error) => {
      if (error.status === 400 && error.error.errors) {
        this.handleServerSideValidationErrors(error.error.errors)
        
      } else {
        console.error('An unexpected error occurred', error);
      }
    } 
    })
  }
  handleServerSideValidationErrors(errors: any[]) {
    // Check if errors is an object with key-value pairs for each field
    if (errors && typeof errors === 'object') {
      // Iterate over each error in the object
      Object.entries(errors).forEach(([field, errorMessage]) => {
        console.log(`Setting error for ${field}: ${errorMessage}`);
        // Set the error on the corresponding form control
        const control = this.signUpForm.get(field);
        if (control) {
          control.setErrors({ serverError: errorMessage });
          control.markAsTouched();  // Make sure the field is marked as touched to show the error
          
        }
      });
    } else {
      console.error('Unexpected error format:', errors);
    }
  }
 

  }





























    // if (err.msg === 'Username must be at least 3 characters long') {
    //   this.formErrors.userName = err.msg // Assign error message to the 
    //   console.log(this.formErrors.userName);
      
      
      
    // } else if(err.msg === 'Please provide the '){
    //   this.formErrors.userName = err.msg
    //   console.log(this.formErrors.userName);
      
    // }
   
      
 


