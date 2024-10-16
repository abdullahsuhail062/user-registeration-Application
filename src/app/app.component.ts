import { Component,Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { HttpClient,} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { ApiServiceService } from './api-service.service';
import { error, log } from 'console';
import { environment } from './environments/environment.prod';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatInputModule,
    MatInputModule,ReactiveFormsModule,CommonModule,NgIf,NgStyle,MatIconModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
@Injectable({providedIn: 'root'})
export class AppComponent {
  hide: boolean = true
  signUpForm: FormGroup
  usernameError: any
  emailError: any
  passwordError: any
  mismatchPasswordsError: any





  constructor(private apiService: ApiServiceService, private http: HttpClient){
    this.signUpForm = new FormGroup({username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9]*')])
      ,email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@example\.(com|org|net)$/)]),password: new FormControl('',[Validators.required,Validators.minLength(8),
        Validators.pattern('^[a-zA-Z0-9]+$'
)]),confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)])}) 
    }


  
  onSubmit(): void{
   const formData ={username: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    }
   
    this.passwordsMisMatchValidator()
    if (this.signUpForm.valid) {
    this.apiService.registerUser(formData).subscribe({next: (data) => {console.log(data);
    }, error: (error) => {
      if (error.serverInternalError) {
        console.log("error is coming from",error.serverInternalError);
      }else{this.handleError(error)}}
    })}}
      handleError(error:any){
     if (error.username) {
      this.usernameError = error.username
      this.signUpForm.get('username')?.setErrors({usernameErr: this.usernameError})
    }
    
      if (error.email) {
        this.emailError = error.email
        this.signUpForm.get('email')?.setErrors({emailErr: this.emailError})

      }
        if (error.password) {
          this.passwordError = error.password
          this.signUpForm.get('password')?.setErrors({passwordErr: this.passwordError})

          
        }
        if (!error.username && !error.email && !error.password && !error.serverInternalError ) {
          console.log('An unexpected error occurred', error.message);
          
     
        }
  }
  
      passwordsMisMatchValidator():any{
        const password = this.signUpForm.get('password')?.value
        const confirmPassword =this.signUpForm.get('confirmPassword')?.value
        this.mismatchPasswordsError = 'password do not match'
        return confirmPassword !== password? this.signUpForm.get('confirmPassword')?.setErrors({mismatchPasswordsError: this.mismatchPasswordsError}): false
      }
  
       togglePasswordVisibility(): boolean{
      return this.hide= !this.hide
      }

    
    }
  

    





























    
      
 


