import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environments/environment.prod';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}
  

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/registerUser`,{'Content-Type': 'application/json',formData}, {responseType: 'json' })
}

}
 


  

