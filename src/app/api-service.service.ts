import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
formData: {username: string} ={username: 'Abu Abdullah'}
  private apiUrl = 'https://user-registeration-server.app.vercel.app/api/register'

  constructor(private http: HttpClient) {}
  

  registerUser(): Observable<any> {
    return this.http.post<any>(this.apiUrl, this.formData, { responseType: 'json' }).pipe(
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
  } else if (error.status ===405) {
    console.error('no request made:', error.message);
  }{
    console.error('unexpected error:', error.message);
    
  }
  return throwError(() => error);

 
}
}
  

