import { Component,Injectable,NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      ,email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@example\.(com|org|net)$/)]),password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9]*')]),confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)])})
    }


  onSubmit(): void{

    const formData = this.signUpForm.value
    this.http.post<unknown>(
      '/api/register',{
      formData}, 
      { responseType: 'json' }
    ).subscribe({next: (data) => {
      console.log(data);
      
      
      
    }, error: (error) => {
      if (error.status === 400 && error.error.errors) {
        const errorMessage =error.error.errors
        this.signUpForm.get('username')?.setErrors({serverErrors: errorMessage})
        
      } else {
        console.error('An unexpected error occurred', error);
      }
    } 
    })
  }      
}


























    // if (err.msg === 'Username must be at least 3 characters long') {
    //   this.formErrors.userName = err.msg // Assign error message to the 
    //   console.log(this.formErrors.userName);
      
      
      
    // } else if(err.msg === 'Please provide the '){
    //   this.formErrors.userName = err.msg
    //   console.log(this.formErrors.userName);
      
    // }
   
      
 


