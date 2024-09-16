import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment.prod';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}
  
registerUser(formData: {username: string})  {
  const url = `${this.apiUrl}/api/register`
  return this.http.post(url, formData, {responseType: 'json'})
}

}
