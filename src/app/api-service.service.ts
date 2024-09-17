import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
formData: {username: string} ={username: 'Abu Abdullah'}
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  

  registerUser(): Observable<any> {
    const url = `${this.apiUrl}/api/register`;
    return this.http.post<any>(url, this.formData, { responseType: 'json' })
    
    .pipe(
      catchError(this.handleError)  // Catch errors here
    );
}

// Error handling function
private handleError(error: HttpErrorResponse) {
  if (error.status === 400) {
    console.error('Bad Request:', error.message);
  } else if (error.status === 401) {
    console.error('Unauthorized:', error.message);
  } else if (error.status === 500) {
    console.error('Server Error:', error.message);
  } else {
    console.error('Unexpected Error:', error.message);
  }
  return throwError(() => error);

 
}
}
  

