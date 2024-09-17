import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment.prod';  // Make sure this path is correct
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(formData: { username: string }): Observable<any> {
    const url = `${this.apiUrl}/api/register`;
    return this.http.post<any>(url, formData, { responseType: 'json' });
  }
}
