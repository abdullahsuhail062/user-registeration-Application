import { Component,Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { HttpClient,} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule



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
  formErrors: any = {username: ''};
  constructor(private http: HttpClient){
    this.signUpForm = new FormGroup({username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9]*')])
      ,email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@example\.(com|org|net)$/)]),password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9]*')]),confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)])}) 
    }


    
    


  onSubmit(): void{
    this.passwordsMisMatchValidator()
    if (this.signUpForm.valid) {
      
    

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
      passwordsMisMatchValidator():any{
        const password = this.signUpForm.get('password')?.value
        const confirmPassword =this.signUpForm.get('confirmPassword')?.value
        return confirmPassword !== password? this.signUpForm.get('confirmPassword')?.setErrors({mismatchPasswordsError: 'Passwords do not match'}): false
      }

      togglePasswordVisibility(): boolean{
        return this.hide= !this.hide
      }

  }





























    
      
 


