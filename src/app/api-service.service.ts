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
    
    return this.http.post<any>('apiUrl/api/register', this.formData, { responseType: 'json' }).pipe(
      catchError(this.handleError)  // Catch errors here
    );
}

// Error handling function
private handleError(error: HttpErrorResponse) {
  let errorMessage = '';

  if (error.error instanceof ErrorEvent) {
    // Client-side or network error occurred
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Server-side error occurred
    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
  }

  // Log the error (you can also use more advanced logging mechanisms)
  console.error(errorMessage);

  // Return a user-friendly message or rethrow the error
  return throwError(() => new Error(errorMessage));
}
}
  

