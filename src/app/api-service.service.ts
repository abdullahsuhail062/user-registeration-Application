import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(formData: { username: string }): Observable<any> {
    
    return this.http.post<any>('apiUrl/api/register', formData, { responseType: 'json' });
  }
}
