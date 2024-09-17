import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
formData: {username: string} ={username: 'Abu Abdullah'}
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  

  registerUser(): Observable<any> {
    
    return this.http.post<any>('apiUrl/api/register', this.formData, { responseType: 'json' });
  }
}
