import { Component,Injectable,NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './app.config.server';


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
  constructor(private http: HttpClient){
    this.signUpForm = new FormGroup({username: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*')]), email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@example\.(com|org|net)$/)]),password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9]*')]),confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)])})
  }

  onSubmit(): void{
    const formData = this.signUpForm.value
    this.http.post<unknown>(
      '/app/api/register', 
      formData, 
      { responseType: 'json' }
    ).subscribe(config => {
      console.log(config);
    });
    
  }
}
