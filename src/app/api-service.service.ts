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
    return this.http.post<any>(`${this.apiUrl}/api/registerUser`,formData,{responseType: 'json'})
}
  loginUser(formData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/loginUser`, formData,{responseType: 'json'})
  }

  fetchUserProfile(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/fetchUserProfile`,{responseType: 'json'})
  }

}
 


  

