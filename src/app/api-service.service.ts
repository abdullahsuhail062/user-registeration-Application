import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 environment ={production: true, apiUrl: 'https://user-registeration-server-app.vercel.app' }

  private apiUrl = this.environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(formData: { username: string }): Observable<any> {
    const url = `${this.apiUrl}/api/register`;
    return this.http.post<any>(url, formData, { responseType: 'json' });
  }
}
