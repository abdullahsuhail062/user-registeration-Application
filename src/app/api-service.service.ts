import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}
  

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/registerUser`,{formData}, {responseType: 'json'})
}

}
 


  

